import {Construct} from 'constructs';
import {Duration, Stack, StackProps} from 'aws-cdk-lib';
import {
    AllowedMethods,
    CacheCookieBehavior,
    CachedMethods,
    CachePolicy,
    Distribution,
    HttpVersion,
    OriginProtocolPolicy,
    PriceClass,
    SecurityPolicyProtocol,
    ViewerProtocolPolicy
} from "aws-cdk-lib/aws-cloudfront";
import {HttpOrigin} from "aws-cdk-lib/aws-cloudfront-origins";
import {Certificate, CertificateValidation} from "aws-cdk-lib/aws-certificatemanager";
import {AaaaRecord, ARecord, HostedZone, RecordTarget} from "aws-cdk-lib/aws-route53";
import {CloudFrontTarget} from "aws-cdk-lib/aws-route53-targets";

import configuration from "../../cfg/configuration";

export class ImageServiceProxyStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        const project = configuration.COMMON.project;

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
            cookieBehavior: CacheCookieBehavior.none(),
            enableAcceptEncodingBrotli: true,
            enableAcceptEncodingGzip: true,
            minTtl: Duration.seconds(1),
            maxTtl: Duration.days(365),
            defaultTtl: Duration.hours(24)
        });

        const distribution = new Distribution(this, `${project}-proxy-distribution`, {
            // comment contains the distribution name
            comment: `${project}-main image proxy distribution`,
            httpVersion: HttpVersion.HTTP2,
            priceClass: PriceClass.PRICE_CLASS_ALL,
            certificate: certificate,
            enableIpv6: true,
            minimumProtocolVersion: SecurityPolicyProtocol.TLS_V1_2_2021,
            enableLogging: true,
            enabled: true,
            domainNames: [
                configuration.HOSTING.imageProxyDomainName
            ],
            defaultBehavior: {
                allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
                cachePolicy: cachePolicy,
                cachedMethods: CachedMethods.CACHE_GET_HEAD_OPTIONS,
                compress: true,
                viewerProtocolPolicy: ViewerProtocolPolicy.HTTPS_ONLY,
                origin: new HttpOrigin(configuration.HOSTING.imageProxyOriginDomain, {
                    originShieldEnabled: true,
                    protocolPolicy: OriginProtocolPolicy.HTTPS_ONLY
                })
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
