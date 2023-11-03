import {getPagePathByDirName, readFrontMatterWithContent} from "@/lib/files";
import {PageSchema} from "@/content/pages/resume/schema";

async function getPost({slug}: { slug: string }) {
    const {frontMatter, content} = await readFrontMatterWithContent<PageSchema>(getPagePathByDirName("resume"));

    return {
        frontMatter,
        slug,
        content
    }
}

export async function generateMetadata({params}: any) {
    const page = await getPost(params);

    return {
        title: page.frontMatter.title,
        description: page.frontMatter.description
    }
}

export default async function Post({params}: any) {
    const props = await getPost(params);

    return (
        <article className='prose prose-sm md:prose-base lg:prose-lg prose-pre:bg-white prose-pre:p-0 mx-auto p-4'>
            <h1>{props.frontMatter.title}</h1>
        </article>
    );
}
