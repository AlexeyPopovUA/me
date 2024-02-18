import React from "react";

import {getPagePathByDirName, readFrontMatterWithContent} from "@/lib/files";
import {PageSchema} from "@/content/pages/contact/schema";
import {getFullPageContent} from "@/lib/articles";
import {PageContent} from "@/components/page-content";
import content from "@/app/configuration/content";

const pageSlug = "contact";

async function getPost() {
    const {frontMatter, content} = await readFrontMatterWithContent<PageSchema>(getPagePathByDirName(pageSlug));

    return {
        frontMatter,
        slug: pageSlug,
        content
    }
}

export async function generateMetadata({params}: any) {
    const page = await getPost();

    return {
        title: `${page.frontMatter.title} - ${content.authorName}`,
        description: page.frontMatter.description
    }
}

export default async function Post(props: any) {
    const page = await getFullPageContent({slug: pageSlug});

    return (
        <article className='prose prose-sm md:prose-base lg:prose-lg prose-pre:bg-white prose-pre:p-0 mx-auto p-4'>
            <h1>{page.title}</h1>
            <PageContent>{page.content}</PageContent>
        </article>
    );
}
