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
import { getAllArticles } from '@/lib/articles';
import { CollectionPageStructuredData } from '@/components/CollectionPageStructuredData';

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
            url: ensurePathSlash(`/${pageSlug}`),
            type: "website",
            images: [ogImage],
        },
    };
}

export default async function Post() {
    const [frontMatter, posts] = await Promise.all([
        getFrontMatterDataByPath<PageSchema>(getPagePathByDirName(pageSlug)),
        getAllArticles()
    ]);
    const pageUrl = `${environment.url}${ensurePathSlash(`/${pageSlug}`)}`;
    const items = posts.map(post => ({
        name: post.title,
        url: `${environment.url}${ensurePathSlash(`/blog/${post.slug}`)}`
    }));

    return (
        <>
            <CollectionPageStructuredData
                title={`${frontMatter.title} - ${content.authorName}`}
                description={frontMatter.description}
                url={pageUrl}
                items={items}
            />
            <main className="min-h-screen bg-background">
                {/* Hero Section */}
                <section className="pt-32 pb-16 px-6">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Blog</h1>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                                Insights on front-end, cloud, and back-end development. Sharing my experiences with React, Node.js, AWS, and modern software
                                engineering.
                            </p>
                        </div>

                        {/* Blog Grid */}
                        <AllPosts posts={posts} />
                    </div>
                </section>
            </main>
        </>
    );
}
