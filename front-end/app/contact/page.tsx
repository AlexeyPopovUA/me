import React from "react";

import {getPagePathByDirName, readFrontMatterWithContent} from "@/lib/files";
import {PageSchema} from "@/content/pages/contact/schema";
import {getFullPageContent} from "@/lib/articles";
import {PageContent} from "@/components/page-content";
import content from "@/app/configuration/content";
import {getOGImageURL} from "@/lib/image";

const pageSlug = "contact";

async function getPost() {
    const {frontMatter, content} = await readFrontMatterWithContent<PageSchema>(getPagePathByDirName(pageSlug));

    return {
        frontMatter,
        slug: pageSlug,
        content
    }
}

export async function generateMetadata() {
    const page = await getPost();
    const ogImage = getOGImageURL({src: "/pages/home/me-w-square-bg.jpg"});

    return {
        title: `${page.frontMatter.title} - ${content.authorName}`,
        description: page.frontMatter.description,
        openGraph: {
            title: `${page.frontMatter.title} - ${content.authorName}`,
            description: page.frontMatter.description,
            images: [
                ogImage
            ]
        },
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
