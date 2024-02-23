import React from "react";

import {getPagePathByDirName, readFrontMatterWithContent} from "@/lib/files";
import {PageSchema} from "@/content/pages/portfolio/schema";
import AllProjects from "@/app/portfolio/all-projects";
import content from "@/app/configuration/content";

const pageSlug = "portfolio";

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
        title: `${page.frontMatter.title} - ${content.authorName}`,
        description: page.frontMatter.description,
        openGraph: {
            title: `${page.frontMatter.title} - ${content.authorName}`,
            description: page.frontMatter.description,
                images: ['/og-image.png']
        },
    }
}

export default function Post() {
    return (
        <article className='container mx-auto px-4 sm:px-8 md:px-12 py-8'>
            <AllProjects />
        </article>
    );
}
