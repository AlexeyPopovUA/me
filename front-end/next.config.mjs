import remarkGfm from 'remark-gfm';
import nextMDX from '@next/mdx'
import images from "remark-images";
import emoji from "remark-emoji";

/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    reactStrictMode: true,
    output: 'export',
    images: {
        formats: ['image/avif', 'image/webp'],
    }
}

const withMDX = nextMDX({
    options: {
        // Configure pageExtensions to include md and mdx
        pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
        remarkPlugins: [remarkGfm, images, emoji],
        rehypePlugins: [],
        // If you use `MDXProvider`, uncomment the following line.
        // providerImportSource: "@mdx-js/react",
    },
})
export default withMDX(nextConfig);
