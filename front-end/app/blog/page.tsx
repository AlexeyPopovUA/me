import React from "react";

import {getPagePathByDirName, readFrontMatterWithContent} from "@/lib/files";
import {PageSchema} from "@/content/pages/blog/schema";
import {getFullPageContent} from "@/lib/articles";
import {PageContent} from "@/components/page-content";
import AllArticles from "@/app/blog/all-articles";

const pageSlug = "blog";

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
        title: page.frontMatter.title,
        description: page.frontMatter.description
    }
}

export default async function Post(props: any) {
    const page = await getFullPageContent({slug: pageSlug});

    return (
        <article className='container mx-auto px-12 py-8'>
            <AllArticles />
        </article>
    );
}
