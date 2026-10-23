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
    FunctionEventType
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

        // Honor Cache-Control from the publish step. minTtl was 1 day, which kept
        // HTML (and the custom 404) at the edge even when the viewer header said
        // max-age=3600. minTtl 0 lets HTML with max-age=0 revalidate immediately.
        // maxTtl still allows immutable /_next/static objects to be cached a year.
        const cachePolicy = new CachePolicy(this, `${project}-cache-policy`, {
            cachePolicyName: `${project}-cache-policy`,
            comment: "Default behavior. TTL follows origin Cache-Control, capped at one year.",
            cookieBehavior: CacheCookieBehavior.none(),
            enableAcceptEncodingBrotli: true,
            enableAcceptEncodingGzip: true,
            minTtl: Duration.seconds(0),
            maxTtl: Duration.days(365),
            defaultTtl: Duration.seconds(0)
        });

        // Hashed Next.js chunks are immutable. A dedicated behavior keeps them
        // compressible and long-lived even if an object is missing Cache-Control.
        // minTtl stays 0 so a missing chunk is not stored as a year-long 404;
        // successful objects with max-age=31536000 are cached for a year.
        const staticCachePolicy = new CachePolicy(this, `${project}-static-cache-policy`, {
            cachePolicyName: `${project}-static-cache-policy`,
            comment: "Immutable _next/static assets. Gzip and Brotli are part of the cache key.",
            cookieBehavior: CacheCookieBehavior.none(),
            enableAcceptEncodingBrotli: true,
            enableAcceptEncodingGzip: true,
            minTtl: Duration.seconds(0),
            maxTtl: Duration.days(365),
            defaultTtl: Duration.days(365)
        });

        const origin = S3BucketOrigin.withOriginAccessIdentity(s3Bucket, {
            originAccessIdentity: originAccessIdentity,
            originShieldRegion: region,
            originPath: "/main"
        });

        const viewerRequestAssociation = {
            function: cf_fn_viewer_request,
            eventType: FunctionEventType.VIEWER_REQUEST
        };

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
                cachedMethods: CachedMethods.CACHE_GET_HEAD_OPTIONS,
                compress: true,
                viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                origin,
                functionAssociations: [viewerRequestAssociation]
            },
            additionalBehaviors: {
                // `*` matches across slashes, so chunks and media are included.
                // compress plus the cache policy's gzip/brotli flags are both set.
                // CloudFront itself only compresses objects from 1,000 to 10,000,000
                // bytes; the publisher gzips smaller text assets and sets Content-Encoding.
                "/_next/static/*": {
                    allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
                    cachePolicy: staticCachePolicy,
                    cachedMethods: CachedMethods.CACHE_GET_HEAD_OPTIONS,
                    compress: true,
                    viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                    origin,
                    functionAssociations: [viewerRequestAssociation]
                }
            },
            errorResponses: [
                {
                    httpStatus: 403,
                    responseHttpStatus: 404,
                    responsePagePath: '/404.html',
                    // Do not keep a missed chunk as the HTML 404. The previous 30 minute
                    // TTL outlived the publish window that deleted objects before upload.
                    ttl: Duration.seconds(0)
                },
                {
                    httpStatus: 404,
                    responseHttpStatus: 404,
                    responsePagePath: '/404.html',
                    ttl: Duration.seconds(0)
                }
            ]
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
