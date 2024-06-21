/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    reactStrictMode: true,
    output: 'export',
    images: {
        formats: ['image/avif', 'image/webp'],
    }
}

export default nextConfig;
