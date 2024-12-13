import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    trailingSlash: true,
    reactStrictMode: true,
    output: 'export',
    images: {
        formats: ['image/avif', 'image/webp'],
    }
}

export default nextConfig;
