import React from "react";

import {getPagePathByDirName, readFrontMatterWithContent} from "@/lib/files";
import {PageSchema} from "@/content/pages/portfolio/schema";
import AllProjects from "@/app/portfolio/all-projects";
import {content} from "@/app/configuration/content";
import {getOGImageURL} from "@/lib/image";

const pageSlug = "portfolio";

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

export default function Post() {
    return (
        <article className='container mx-auto px-4 sm:px-8 md:px-12 py-8'>
            <AllProjects/>
        </article>
    );
}
