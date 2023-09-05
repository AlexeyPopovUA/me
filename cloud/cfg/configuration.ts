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
        staticDomainName: "me.oleksiipopov.com",
        serviceDomainName: "service.me.oleksiipopov.com"
    }
};
