import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';


async function getPost({slug}: { slug: string }) {
    const markdownFile = await fs.readFile(path.join('pages', "blog", `article.mdx`), 'utf-8');

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
        </article>
    );
}
