import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

import LatestArticles from '@/app/latest-articles';
import { getOGImageURL, readBlurredImageSrcPair } from '@/lib/image';
import { getFrontMatterDataByPath } from '@/lib/mdx-utils';
import { getPagePathByDirName } from '@/lib/files';
import { getRssMetadataObject } from '@/lib/rss';
import { imageLoader } from '@/components/image/image-loader';
import { PageSchema } from '@/content/pages/resume/schema';
import { environment } from '@/app/configuration/environment';
import { ThumbnailImage } from '@/components/image/animated-image-loading/thumbnail-image';
import data from '@/app/resume/data/data';
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
                                <div className="mb-4 text-xl lg:text-2xl">Front-End-Heavy Full-Stack Software Developer</div>
                                <div className="mb-4">
                                    with 13+ years of experience crafting robust software solutions using React, Node.js, JavaScript, TypeScript, and
                                    AWS.
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            I can help you with:
                            <ul className="mt-2 list-none space-y-1 pl-6">
                                <li>
                                    ⚡️{' '}
                                    <Link title={content.services.workFor1Hour.title} href={content.services.workFor1Hour.url}>
                                        Boosting your web app&apos;s performance
                                    </Link>
                                </li>
                                <li>
                                    🚀{' '}
                                    <Link title={content.services.workFor1Hour.title} href={content.services.workFor1Hour.url}>
                                        Accelerating development & delivery
                                    </Link>
                                </li>
                                <li>
                                    🧹{' '}
                                    <Link title={content.services.workFor1Hour.title} href={content.services.workFor1Hour.url}>
                                        Enhancing code quality & maintainability
                                    </Link>
                                </li>
                                <li>
                                    ☁️{' '}
                                    <Link title={content.services.workFor1Hour.title} href={content.services.workFor1Hour.url}>
                                        Improving CI/CD & AWS infrastructure
                                    </Link>
                                </li>
                                <li>
                                    🔍{' '}
                                    <Link title={content.services.workFor1Hour.title} href={content.services.workFor1Hour.url}>
                                        Reviewing your projects & codebases
                                    </Link>
                                </li>
                                <li>
                                    👥{' '}
                                    <Link title={content.services.technicalInterview.title} href={content.services.technicalInterview.url}>
                                        Hiring & building front-end teams
                                    </Link>
                                </li>
                            </ul>
                            <br />
                            <Link className="font-bold" href={`mailto:${data.user.Email}`}>
                                Contact me via email
                            </Link>{' '}
                            to chat about your project!
                            <br />
                            <br />
                            Or{' '}
                            <Link className="font-bold" href={content.services.scheduleCall.url} target="_blank">
                                {content.services.scheduleCall.title}
                            </Link>{' '}
                            if you prefer a quick video chat.
                        </div>
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
                        <p className="mb-4">
                            I share insights on front-end, cloud, and back-end development{' '}
                            <Link className="font-bold" href={'/blog'}>
                                on my blog
                            </Link>
                            .
                        </p>
                        <p className="mb-4">Check out some of my latest articles:</p>
                        <LatestArticles />
                    </section>
                </div>
            </main>
        </>
    );
}
