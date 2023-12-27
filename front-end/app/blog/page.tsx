import React from "react";

import {getPagePathByDirName, readFrontMatterWithContent} from "@/lib/files";
import {PageSchema} from "@/content/pages/blog/schema";
import AllPosts from "@/components/all-posts";

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

export default function Post() {
    return (
        <article className='container mx-auto px-4 sm:px-8 md:px-12 py-8'>
            <AllPosts type="article" />
        </article>
    );
}
