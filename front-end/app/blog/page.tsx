import React from "react";

import {getPagePathByDirName, readFrontMatterWithContent} from "@/lib/files";
import {PageSchema} from "@/content/pages/blog/schema";
import AllPosts from "@/app/blog/all-posts";
import {content} from "@/app/configuration/content";
import {getOGImageURL} from "@/lib/image";
import {environment} from "@/app/configuration/environment";
import {ensurePathSlash} from "@/lib/utils";
import {Metadata} from "next";

const pageSlug = "blog";

export async function generateMetadata(): Promise<Metadata> {
    const {frontMatter} = await readFrontMatterWithContent<PageSchema>(getPagePathByDirName(pageSlug));
    const ogImage = getOGImageURL({src: "/pages/home/me-w-square-bg.jpg"});

    return {
        title: `${frontMatter.title} - ${content.authorName}`,
        description: frontMatter.description,
        metadataBase: new URL(environment.url),
        alternates: {
            canonical: ensurePathSlash(`/${pageSlug}`)
        },
        keywords: frontMatter.keywords,
        openGraph: {
            title: `${frontMatter.title} - ${content.authorName}`,
            description: frontMatter.description,
            images: [
                ogImage
            ]
        },
    }
}

export default function Post() {
    return (
        <article className='container mx-auto px-4 sm:px-8 md:px-12 py-8'>
            <AllPosts/>
        </article>
    );
}
