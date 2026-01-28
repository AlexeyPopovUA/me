import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

import LatestArticles from '@/app/latest-articles';
import FeaturedProjects from '@/app/featured-projects';
import { getOGImageURL } from '@/lib/image';
import { readBlurredImageSrcPair } from '@/lib/image-server';
import { getFrontMatterDataByPath } from '@/lib/mdx-utils';
import { getPagePathByDirName } from '@/lib/files';
import { getRssMetadataObject } from '@/lib/rss';
import { PageSchema } from '@/content/pages/resume/schema';
import { environment } from '@/app/configuration/environment';
import { HomePageStructuredData } from '@/components/HomePageStructuredData';
import { content } from '@/app/configuration/content';
import { HeroSection } from '@/components/hero-section';

const pageSlug = 'home';

export async function generateMetadata(): Promise<Metadata> {
    const frontMatter = await getFrontMatterDataByPath<PageSchema>(getPagePathByDirName(pageSlug));
    const ogImage = getOGImageURL({ src: frontMatter.thumbnail });

    return {
        title: frontMatter.title,
        description: frontMatter.description,
        keywords: frontMatter.keywords,
        metadataBase: new URL(environment.url),
        alternates: { canonical: '/', types: getRssMetadataObject() },
        openGraph: {
            title: frontMatter.title,
            description: frontMatter.description,
            url: "/",
            type: "website",
            images: [ogImage],
        },
    };
}

export default async function Home() {
    const { src, blurDataURL } = await readBlurredImageSrcPair({ src: '/pages/home/me-w-square-bg.jpg' });
    const frontMatter = await getFrontMatterDataByPath<PageSchema>(getPagePathByDirName(pageSlug));
    const imageUrl = getOGImageURL({ src });

    return (
        <>
            <HomePageStructuredData
                title={frontMatter.title}
                description={frontMatter.description}
                name={content.authorName}
                jobTitle="Front-End-Heavy Full-Stack Software Developer"
                url={environment.url}
                image={imageUrl}
            />
            <main className="min-h-screen bg-background">
                <HeroSection
                    src={src}
                    blurDataURL={blurDataURL}
                    name="Oleksii Popov"
                    title="Front-End Leaning Full-Stack Developer"
                    description="With 14 years of experience crafting robust software solutions. I specialize in building scalable web applications with modern technologies."
                />
                <FeaturedProjects />
                <LatestArticles />
            </main>
        </>
    );
}
