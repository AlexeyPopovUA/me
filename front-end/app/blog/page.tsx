import React from 'react';
import { Metadata } from 'next';

import { getPagePathByDirName } from '@/lib/files';
import { PageSchema } from '@/content/pages/blog/schema';
import AllPosts from '@/app/blog/all-posts';
import { content } from '@/app/configuration/content';
import { getOGImageURL } from '@/lib/image';
import { environment } from '@/app/configuration/environment';
import { ensurePathSlash } from '@/lib/utils';
import { getFrontMatterDataByPath } from '@/lib/mdx-utils';
import { getRssMetadataObject } from '@/lib/rss';

const pageSlug = 'blog';

export async function generateMetadata(): Promise<Metadata> {
    const frontMatter = await getFrontMatterDataByPath<PageSchema>(getPagePathByDirName(pageSlug));
    const ogImage = getOGImageURL({ src: frontMatter.thumbnail });

    return {
        title: `${frontMatter.title} - ${content.authorName}`,
        description: frontMatter.description,
        metadataBase: new URL(environment.url),
        alternates: {
            canonical: ensurePathSlash(`/${pageSlug}`),
            types: getRssMetadataObject(),
        },
        keywords: frontMatter.keywords,
        openGraph: {
            title: `${frontMatter.title} - ${content.authorName}`,
            description: frontMatter.description,
            images: [ogImage],
        },
    };
}

export default function Post() {
    return (
        <article className="container mx-auto px-4 py-8 sm:px-8 md:px-12">
            <div className="prose prose-sm md:prose-base lg:prose-lg mb-4">
                <h1>Blog</h1>
            </div>
            <AllPosts />
        </article>
    );
}
