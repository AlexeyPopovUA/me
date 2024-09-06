import {resolve} from "node:path";
import {Construct} from 'constructs';
import {Duration, Stack, StackProps} from 'aws-cdk-lib';
import {
  AllowedMethods,
  CacheCookieBehavior,
  CachedMethods,
  CacheHeaderBehavior,
  CachePolicy,
  Distribution,
  FunctionCode,
  FunctionEventType,
  HttpVersion,
  OriginAccessIdentity,
  OriginProtocolPolicy,
  PriceClass,
  SecurityPolicyProtocol,
  ViewerProtocolPolicy,
  Function as CFFunction
} from "aws-cdk-lib/aws-cloudfront";
import {HttpOrigin, S3Origin} from "aws-cdk-lib/aws-cloudfront-origins";
import {Certificate, CertificateValidation} from "aws-cdk-lib/aws-certificatemanager";
import {AaaaRecord, ARecord, HostedZone, RecordTarget} from "aws-cdk-lib/aws-route53";
import {CloudFrontTarget} from "aws-cdk-lib/aws-route53-targets";
import {Bucket} from "aws-cdk-lib/aws-s3";

import configuration from "../../cfg/configuration";

export class ImageServiceProxyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const project = configuration.COMMON.project;

    const s3Bucket = Bucket.fromBucketAttributes(this, `${project}-image-sources-origin-bucket`, {
      bucketName: configuration.HOSTING.imageBucketName,
      region: configuration.HOSTING.imageBucketRegion
    });

    // Granting access to the bucket the old way.
    // Bucket policy was manually created in the S3 console.
    const originAccessIdentity = new OriginAccessIdentity(this, `${project}-image-sources-origin-access-identity`, {
      comment: "Image sources hosting access identity"
    });

    const originalsViewerRequest = new CFFunction(this, `${project}-originals-viewer-request`, {
      code: FunctionCode.fromFile({
        filePath: resolve(process.cwd(), "./stacks/front-end/originals-viewer-request.js")
      }),
      comment: `Viewer request cloudfront function for adjusting URL path for original assets (${project})`
    });

    const hostedZone = HostedZone.fromHostedZoneAttributes(this, `${project}-hosted-zone`, {
      hostedZoneId: configuration.HOSTING.hostedZoneID,
      zoneName: configuration.HOSTING.hostedZoneName
    });

    const certificate = new Certificate(this, `${project}-cert`, {
      domainName: configuration.HOSTING.imageProxyDomainName,
      validation: CertificateValidation.fromDns(hostedZone)
    });

    const cachePolicy = new CachePolicy(this, `${project}-cache-policy`, {
      cachePolicyName: `${project}-proxy-cache-policy`,
      headerBehavior: CacheHeaderBehavior.allowList("Accept"),
      cookieBehavior: CacheCookieBehavior.none(),
      enableAcceptEncodingBrotli: true,
      enableAcceptEncodingGzip: true,
      minTtl: Duration.days(30),
      maxTtl: Duration.days(365),
      defaultTtl: Duration.days(100)
    });

    const distribution = new Distribution(this, `${project}-proxy-distribution`, {
      // comment contains the distribution name
      comment: `${project}-main image proxy distribution`,
      httpVersion: HttpVersion.HTTP2_AND_3,
      priceClass: PriceClass.PRICE_CLASS_ALL,
      certificate,
      enableIpv6: true,
      minimumProtocolVersion: SecurityPolicyProtocol.TLS_V1_2_2021,
      enableLogging: true,
      enabled: true,
      domainNames: [
        configuration.HOSTING.imageProxyDomainName
      ],
      defaultBehavior: {
        allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        cachePolicy,
        cachedMethods: CachedMethods.CACHE_GET_HEAD_OPTIONS,
        compress: true,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        origin: new HttpOrigin(configuration.HOSTING.imageProxyOriginDomain, {
          originShieldEnabled: true,
          protocolPolicy: OriginProtocolPolicy.HTTPS_ONLY
        })
      },
      additionalBehaviors: {
        [`/${configuration.HOSTING.imageProxyOriginalsPath}/*`]: {
          allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
          cachePolicy,
          cachedMethods: CachedMethods.CACHE_GET_HEAD_OPTIONS,
          compress: true,
          viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          origin: new S3Origin(s3Bucket, {
            originAccessIdentity,
            originShieldRegion: configuration.HOSTING.imageBucketRegion,
            originPath: "/"
          }),
          // CloudFront Functions
          functionAssociations: [
            {
              function: originalsViewerRequest,
              eventType: FunctionEventType.VIEWER_REQUEST
            }
          ]
        }
      }
    });

    new ARecord(this, `${project}-record-a`, {
      recordName: configuration.HOSTING.imageProxyDomainName,
      zone: hostedZone,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution))
    });

    new AaaaRecord(this, `${project}-record-4a`, {
      recordName: configuration.HOSTING.imageProxyDomainName,
      zone: hostedZone,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution))
    });
  }
}
