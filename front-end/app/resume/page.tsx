import {getPagePathByDirName, readFrontMatterWithContent} from "@/lib/files";
import {PageSchema} from "@/content/pages/resume/schema";
import {PageContent} from "@/components/page-content";
import {getFullPageContent} from "@/lib/articles";

const pageSlug = "resume";

async function getPost({slug}: { slug: string }) {
    const {frontMatter, content} = await readFrontMatterWithContent<PageSchema>(getPagePathByDirName(pageSlug));

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
    const page = await getFullPageContent({slug: pageSlug});

    return (
        <article className='prose prose-sm md:prose-base lg:prose-lg prose-pre:bg-white prose-pre:p-0 mx-auto p-4'>
            <h1>{page.title}</h1>
            <PageContent>{page.content}</PageContent>
        </article>
    );
}
