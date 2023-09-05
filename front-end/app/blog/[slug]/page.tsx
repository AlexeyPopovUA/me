import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import {MDXRemote, MDXRemoteProps} from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import Image, {ImageProps} from 'next/image';
import images from "remark-images";
import emoji from "remark-emoji";
import {FC} from "react";
import {MDXComponents} from "mdx/types";

type ResponsiveImageProps = {
    src: ImageProps["src"];
    alt: ImageProps["alt"]
}

const ResponsiveImage: FC<ImageProps> = (props: ResponsiveImageProps) => (
    <Image
        alt={props.alt}
        src={props.src}
        width={800}
        height={600}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        // Make the image display full width
        style={{
            width: '100%',
            height: 'auto'
        }}
        loading="lazy"
    />
)

const components: MDXComponents = {
    // @ts-ignore
    img: ResponsiveImage
};

const options: MDXRemoteProps["options"] = {
    mdxOptions: {
        remarkPlugins: [remarkGfm, images, emoji],
        rehypePlugins: [],
    }
};

async function getPost({slug}: { slug: string }) {
    const markdownFile = await fs.readFile(path.join('articles', slug, `article.mdx`), 'utf-8');

    const {data: frontMatter, content} = matter(markdownFile);

    return {
        frontMatter,
        slug,
        content
    }
}

export async function generateMetadata({params}: any) {
    const blog = await getPost(params);

    return {
        title: blog.frontMatter.title,
        description: blog.frontMatter.description
    }
}

export default async function Post({params}: any) {
    const props = await getPost(params);

    return (
        <article className='prose prose-sm md:prose-base lg:prose-lg mx-auto p-4'>
            <h1>{props.frontMatter.title}</h1>

            <MDXRemote source={props.content} options={options} components={components}/>
        </article>
    );
}
