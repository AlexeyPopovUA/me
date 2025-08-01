// this is CloudFront Function, not a lambda@edge. See https://aws.amazon.com/blogs/aws/introducing-cloudfront-functions-run-your-code-at-the-edge-with-low-latency-at-any-scale/
// JavaScript -> ECMAScript 5.1 compliant
// https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-javascript-runtime-features.html#writing-functions-javascript-features-builtin-objects

var FILE_REGEX = new RegExp("\\/.*[\\w\\d]+\\.[\\w\\d]+$");

function handler(event) {
    var request = event.request;
    var host = request.headers.host.value;
    var subdomain = "";

    // redirects visitor to a naked domain, i.e. https://www.oleksiipopov.com -> https://oleksiipopov.com
    if (host.match(/^w{1,3}\..+/)) {
        // this case does 2 things:
        // * supports typos in "www", i.e. https://w.oleksiipopov.com -> https://oleksiipopov.com, https://ww.oleksiipopov.com -> https://oleksiipopov.com
        // * only adds a trailing slash for navigation requests (not for files)
        var nakedDomain = host.replace(/^w{1,3}\./, "");
        var location = `https://${nakedDomain}${request.uri}`;

        // redirection. Request will not be passed to any edge function or origin
        return {
            statusCode: 301,
            statusDescription: "Permanent redirection",
            headers: {
                "location": {
                    "value": location
                }
            }
        };
    } else if (host.includes(".dev.")) {
        subdomain = host.replace(/\.dev\..+/, "");
        request.uri = `/${subdomain}${request.uri}`;
    }

    // If not a file, then it is a navigation request
    if (!FILE_REGEX.test(request.uri)) {
        request.uri = request.uri.endsWith("/") ? `${request.uri}index.html` : `${request.uri}/index.html`;
    }

    return request;
}
