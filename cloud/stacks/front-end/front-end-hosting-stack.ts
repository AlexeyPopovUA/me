import {resolve} from "node:path";
import {Construct} from 'constructs';
import {Duration, RemovalPolicy, Stack, StackProps} from 'aws-cdk-lib';
import {
    AllowedMethods,
    CacheCookieBehavior,
    CachedMethods,
    CachePolicy,
    Distribution,
    HttpVersion,
    SecurityPolicyProtocol,
    ViewerProtocolPolicy,
    PriceClass,
    OriginAccessIdentity,
    FunctionCode,
    Function as CFFunction,
    FunctionEventType, ResponseHeadersPolicy
} from "aws-cdk-lib/aws-cloudfront";
import {S3BucketOrigin} from "aws-cdk-lib/aws-cloudfront-origins";
import {Certificate, CertificateValidation} from "aws-cdk-lib/aws-certificatemanager";
import {AaaaRecord, ARecord, CnameRecord, HostedZone, RecordTarget} from "aws-cdk-lib/aws-route53";
import {CloudFrontTarget} from "aws-cdk-lib/aws-route53-targets";
import {BlockPublicAccess, Bucket} from "aws-cdk-lib/aws-s3";

import configuration from "../../cfg/configuration";

export class FrontEndHostingStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        const region = props.env?.region;
        const project = configuration.COMMON.project;

        const s3Bucket = new Bucket(this, `${project}-origin-bucket`, {
            bucketName: `${project}-hosting`,
            removalPolicy: RemovalPolicy.RETAIN,
            publicReadAccess: false,
            blockPublicAccess: BlockPublicAccess.BLOCK_ALL
        });

        const originAccessIdentity = new OriginAccessIdentity(this, `${project}-origin-access-identity`, {
            comment: "Front-End hosting access identity"
        });

        s3Bucket.grantRead(originAccessIdentity);

        const hostedZone = HostedZone.fromHostedZoneAttributes(this, `${project}-hosted-zone`, {
            hostedZoneId: configuration.HOSTING.hostedZoneID,
            zoneName: configuration.HOSTING.hostedZoneName
        });

        const certificate = new Certificate(this, `${project}-cert`, {
            domainName: configuration.HOSTING.staticDomainName,
            subjectAlternativeNames: [
                `*.${configuration.HOSTING.staticDomainName}`,
                `*.dev.${configuration.HOSTING.staticDomainName}`
            ],
            validation: CertificateValidation.fromDns(hostedZone)
        });

        const cf_fn_viewer_request = new CFFunction(this, `${project}-cf-fn-viewer-request`, {
            code: FunctionCode.fromFile({
                filePath: resolve(process.cwd(), "./stacks/front-end/cf-fn-viewer-request.js")
            }),
            comment: `Viewer request cloudfront function for redirections and subdomains (${project})`
        });

        const cachePolicy = new CachePolicy(this, `${project}-cache-policy`, {
            cachePolicyName: `${project}-cache-policy`,
            cookieBehavior: CacheCookieBehavior.none(),
            enableAcceptEncodingBrotli: true,
            enableAcceptEncodingGzip: true,
            minTtl: Duration.days(1),
            maxTtl: Duration.days(365),
            defaultTtl: Duration.days(30)
        });

        const responseHeadersPolicy = new ResponseHeadersPolicy(this, `${project}-response-headers-policy`, {
            customHeadersBehavior: {
                customHeaders: [
                    {
                        header: "Cache-Control",
                        value: `max-age=${1 * 60 * 60}`, // 1 hour
                        override: false
                    }
                ]
            }
        });

        const distribution = new Distribution(this, `${project}-api-distribution`, {
            // comment contains the distribution name
            comment: `${project}-main hosting distribution`,
            httpVersion: HttpVersion.HTTP2_AND_3,
            priceClass: PriceClass.PRICE_CLASS_ALL,
            certificate: certificate,
            enableIpv6: true,
            minimumProtocolVersion: SecurityPolicyProtocol.TLS_V1_2_2021,
            enableLogging: true,
            enabled: true,
            domainNames: [
                configuration.HOSTING.staticDomainName,
                `*.${configuration.HOSTING.staticDomainName}`,
                `*.dev.${configuration.HOSTING.staticDomainName}`,
            ],
            defaultBehavior: {
                allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
                cachePolicy,
                responseHeadersPolicy,
                cachedMethods: CachedMethods.CACHE_GET_HEAD_OPTIONS,
                compress: true,
                viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                origin: S3BucketOrigin.withOriginAccessIdentity(s3Bucket, {
                    originAccessIdentity: originAccessIdentity,
                    originShieldRegion: region,
                    originPath: "/main"
                }),
                // CloudFront Functions
                functionAssociations: [
                    {
                        function: cf_fn_viewer_request,
                        eventType: FunctionEventType.VIEWER_REQUEST
                    }
                ]
            }
        });

        new CnameRecord(this, `${project}-record-cname-all`, {
            recordName: `*.dev.${configuration.HOSTING.staticDomainName}.`,
            zone: hostedZone,
            domainName: configuration.HOSTING.staticDomainName
        });

        new CnameRecord(this, `${project}-record-cname-www`, {
          recordName: `www.${configuration.HOSTING.staticDomainName}.`,
          zone: hostedZone,
          domainName: configuration.HOSTING.staticDomainName
        });

        new ARecord(this, `${project}-record-a`, {
            recordName: configuration.HOSTING.staticDomainName,
            zone: hostedZone,
            target: RecordTarget.fromAlias(new CloudFrontTarget(distribution))
        });

        new AaaaRecord(this, `${project}-record-4a`, {
            recordName: configuration.HOSTING.staticDomainName,
            zone: hostedZone,
            target: RecordTarget.fromAlias(new CloudFrontTarget(distribution))
        });
    }
}
