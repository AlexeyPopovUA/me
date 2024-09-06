export default {
    COMMON: {
        project: "me",
        region: process.env?.AWS_DEPLOYMENT_REGION || "",
        account: process.env?.AWS_ACCOUNT || "",
        defaultEnvironment: process.env?.DEFAULT_BRANCH || "main"
    },
    HOSTING: {
        hostedZoneID: process.env?.HOSTED_ZONE_ID || "",
        hostedZoneName: "oleksiipopov.com",
        staticDomainName: "oleksiipopov.com",
        oldBlogStaticDomainName: "blog.oleksiipopov.com",
        serviceDomainName: "service.oleksiipopov.com",
        imageProxyDomainName: "images.oleksiipopov.com",
        imageProxyOriginDomain: "dqdoi2i9o4m2u.cloudfront.net",
        imageProxyOriginalsPath: "originals",
        imageBucketName: "serverless-image-handler-image-source",
        imageBucketRegion: "us-east-1",
    }
};
