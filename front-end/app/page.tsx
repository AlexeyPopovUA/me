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
import { imageLoader } from '@/components/image/image-loader';
import { PageSchema } from '@/content/pages/resume/schema';
import { environment } from '@/app/configuration/environment';
import { ThumbnailImage } from '@/components/image/animated-image-loading/thumbnail-image';
import { HomePageStructuredData } from '@/components/HomePageStructuredData';
import { content } from '@/app/configuration/content';

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
            <main className="flex flex-col items-center px-8 py-4">
                <div className="prose prose-sm md:prose-base lg:prose-lg prose-pre:bg-white prose-pre:p-0 mx-auto mb-24">
                    <section>
                        <div className="flex flex-col sm:flex-row">
                            <div className="mr-4 mb-4 flex flex-row justify-center">
                                <ThumbnailImage
                                    className="aspect-square w-72 rounded-full border-4 border-amber-500 sm:w-52 md:w-60 lg:w-64"
                                    imageClassName="rounded-full aspect-square"
                                    loader={imageLoader}
                                    placeholder="blur"
                                    loading="eager"
                                    blurDataURL={blurDataURL}
                                    quality={70}
                                    width={300}
                                    height={300}
                                    src={src}
                                    alt="Profile photo of Oleksii Popov"
                                    title="Profile photo of Oleksii Popov"
                                />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h1 className="mb-2 text-xl md:text-2xl lg:text-3xl">Hi, I&apos;m Oleksii Popov,</h1>
                                <div className="mb-4 text-xl lg:text-2xl">Front End Leaning Full-Stack Software Developer</div>
                                <div className="mb-4">
                                    with 14 years of experience crafting robust software solutions using React, Node.js, JavaScript, TypeScript, and
                                    AWS.
                                </div>
                            </div>
                        </div>
                        {/*<div className="mb-4">
                            <Link className="font-bold text-amber-500" href={content.services.scheduleCall.url} target="_blank">
                              Book a call with me
                            </Link>, if you need help with:
                            <ul className="mt-2 list-none pl-6">
                                <li>
                                    🔧 Developing a full-stack web app with React, Node.js, and TypeScript and infrastructure on AWS
                                </li>
                                <li>
                                    ⚡️ Boosting your web app&apos;s performance
                                </li>
                                <li>
                                    🚀 Accelerating development & delivery
                                </li>
                                <li>
                                    🧹 Enhancing code quality & maintainability
                                </li>
                                <li>
                                    ☁️ Improving CI/CD & AWS infrastructure
                                </li>
                                <li>
                                    🔍 Reviewing your projects & codebases
                                </li>
                                <li>
                                    👥 Hiring & building front-end teams
                                </li>
                            </ul>
                            <Link className="font-bold" href='/contact'>
                                Contact me&nbsp;
                            </Link>
                            to chat about your project or&nbsp;
                            <Link className="font-bold" href={content.services.scheduleCall.url} target="_blank">
                                {content.services.scheduleCall.title}
                            </Link>{' '}
                            right away.
                        </div>*/}
                        <p className="mb-4">
                            Curious about my professional journey?{' '}
                            <Link className="font-bold" href={'/resume'}>
                                View my CV
                            </Link>
                            .
                        </p>
                        <p className="mb-4">
                            Explore examples of my work in the{' '}
                            <Link className="font-bold" href={'/portfolio'}>
                                portfolio
                            </Link>
                            .
                        </p>
                        <FeaturedProjects />
                        <p className="mb-4">
                            I share insights on front-end, cloud, and back-end development{' '}
                            <Link className="font-bold" href={'/blog'}>
                                on my blog
                            </Link>
                            . Check out some of my latest articles:
                        </p>
                        <LatestArticles />
                    </section>
                </div>
            </main>
        </>
    );
}
