import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    trailingSlash: true,
    reactStrictMode: true,
    output: 'export',
    images: {
        formats: ['image/avif', 'image/webp'],
        qualities: [70, 75],
    }
}

export default nextConfig;
