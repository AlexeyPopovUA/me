import {resolve} from "node:path";
import {Construct} from 'constructs';
import {Duration, Stack, StackProps} from 'aws-cdk-lib';
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
    FunctionCode,
    Function as CFFunction,
    FunctionEventType
} from "aws-cdk-lib/aws-cloudfront";
import {HttpOrigin} from "aws-cdk-lib/aws-cloudfront-origins";
import {Certificate, CertificateValidation} from "aws-cdk-lib/aws-certificatemanager";
import {AaaaRecord, ARecord, CnameRecord, HostedZone, RecordTarget} from "aws-cdk-lib/aws-route53";
import {CloudFrontTarget} from "aws-cdk-lib/aws-route53-targets";

import configuration from "../../cfg/configuration";

export class OldBlogRedirectionStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        const project = configuration.COMMON.project;

        const hostedZone = HostedZone.fromHostedZoneAttributes(this, `${project}-hosted-zone`, {
            hostedZoneId: configuration.HOSTING.hostedZoneID,
            zoneName: configuration.HOSTING.hostedZoneName
        });

        const certificate = new Certificate(this, `${project}-cert`, {
            domainName: configuration.HOSTING.oldBlogStaticDomainName,
            subjectAlternativeNames: [
                `*.${configuration.HOSTING.oldBlogStaticDomainName}`
            ],
            validation: CertificateValidation.fromDns(hostedZone)
        });

        const cf_fn_viewer_request = new CFFunction(this, `${project}-cf-fn-viewer-request`, {
            code: FunctionCode.fromFile({
                filePath: resolve(process.cwd(), "./stacks/front-end/old-blog-cf-fn-viewer-request.js")
            }),
            comment: `Viewer request cloudfront function for redirections from the old blog urls (${project})`
        });

        const cachePolicy = new CachePolicy(this, `${project}-cache-policy`, {
            cachePolicyName: `${project}-old-blog-cache-policy`,
            cookieBehavior: CacheCookieBehavior.none(),
            enableAcceptEncodingBrotli: true,
            enableAcceptEncodingGzip: true,
            minTtl: Duration.days(1),
            maxTtl: Duration.days(365),
            defaultTtl: Duration.days(30)
        });

        const distribution = new Distribution(this, `${project}-old-blog-distribution`, {
            // comment contains the distribution name
            comment: `${project}-main old-blog distribution`,
            httpVersion: HttpVersion.HTTP2_AND_3,
            priceClass: PriceClass.PRICE_CLASS_100,
            certificate: certificate,
            enableIpv6: true,
            minimumProtocolVersion: SecurityPolicyProtocol.TLS_V1_2_2021,
            enableLogging: true,
            enabled: true,
            domainNames: [
                configuration.HOSTING.oldBlogStaticDomainName,
                `*.${configuration.HOSTING.oldBlogStaticDomainName}`
            ],
            defaultBehavior: {
                allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
                cachePolicy: cachePolicy,
                cachedMethods: CachedMethods.CACHE_GET_HEAD_OPTIONS,
                compress: true,
                origin: new HttpOrigin(configuration.HOSTING.staticDomainName, {}),
                viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                // CloudFront Functions
                functionAssociations: [
                    {
                        function: cf_fn_viewer_request,
                        eventType: FunctionEventType.VIEWER_REQUEST
                    }
                ]
            }
        });

        // new CnameRecord(this, `${project}-record-cname-all`, {
        //     recordName: `*.${configuration.HOSTING.oldBlogStaticDomainName}.`,
        //     zone: hostedZone,
        //     domainName: configuration.HOSTING.oldBlogStaticDomainName
        // });

        new ARecord(this, `${project}-record-a`, {
            recordName: configuration.HOSTING.oldBlogStaticDomainName,
            zone: hostedZone,
            target: RecordTarget.fromAlias(new CloudFrontTarget(distribution))
        });

        new AaaaRecord(this, `${project}-record-4a`, {
            recordName: configuration.HOSTING.oldBlogStaticDomainName,
            zone: hostedZone,
            target: RecordTarget.fromAlias(new CloudFrontTarget(distribution))
        });
    }
}
