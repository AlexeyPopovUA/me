import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    trailingSlash: true,
    reactStrictMode: true,
    output: 'export',
    experimental: {
        // TypeScript 7 ships a native tsc and no JavaScript compiler API.
        // Next.js 16.4 typechecks with that tsc binary when this flag is on (also the 16.4 default).
        useTypeScriptCli: true,
    },
    // mermaid-cli renders diagrams with puppeteer page.$eval and a dynamic import().
    // Turbopack in Next.js 16.4 rejects that import while bundling the prerender.
    // Leave both packages on Node's resolver, which is how the build loaded them before.
    serverExternalPackages: ['puppeteer', '@mermaid-js/mermaid-cli'],
    images: {
        formats: ['image/avif', 'image/webp'],
        qualities: [70, 75],
    }
}

export default nextConfig;
