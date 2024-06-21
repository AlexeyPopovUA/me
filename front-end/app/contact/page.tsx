import React from "react";

import {getPagePathByDirName, readFrontMatterWithContent} from "@/lib/files";
import {PageSchema} from "@/content/pages/contact/schema";
import {PageContent} from "@/components/page-content";
import {content} from "@/app/configuration/content";
import {getOGImageURL} from "@/lib/image";

const pageSlug = "contact";

export async function generateMetadata() {
    const {frontMatter} = await readFrontMatterWithContent<PageSchema>(getPagePathByDirName(pageSlug));
    const ogImage = getOGImageURL({src: "/pages/home/me-w-square-bg.jpg"});

    return {
        title: `${frontMatter.title} - ${content.authorName}`,
        description: frontMatter.description,
        openGraph: {
            title: `${frontMatter.title} - ${content.authorName}`,
            description: frontMatter.description,
            images: [
                ogImage
            ]
        }
    }
}

export default async function Post() {
    return (
        <article className='prose prose-sm md:prose-base lg:prose-lg prose-pre:bg-white prose-pre:p-0 mx-auto p-4'>
            <PageContent slug={pageSlug}/>
        </article>
    );
}
