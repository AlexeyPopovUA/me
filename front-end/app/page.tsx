import React from "react";
import Image from "next/image";
import Link from "next/link";

import LatestArticles from "@/app/latest-articles";
import {readBlurredImageSrcPair} from "@/lib/image";
import {imageLoader} from "@/components/image/image-loader";
import {getPagePathByDirName, readFrontMatterWithContent} from "@/lib/files";
import {PageSchema} from "@/content/pages/resume/schema";

const pageSlug = "home";

async function getPost({slug}: { slug: string }) {
    const {frontMatter} = await readFrontMatterWithContent<PageSchema>(getPagePathByDirName(pageSlug));

    return {
        frontMatter,
        slug
    }
}

export async function generateMetadata({params}: any) {
    const page = await getPost(params);

    return {
        title: page.frontMatter.title,
        description: page.frontMatter.description,
        keywords: page.frontMatter.keywords
    }
}

export default async function Home() {
    const {src, blurDataURL} = await readBlurredImageSrcPair({src: "/pages/home/me-w-square-bg.jpg"});

    return (<main className="flex flex-col items-center py-4 px-8">
            <div className="prose prose-sm md:prose-base lg:prose-lg prose-pre:bg-white prose-pre:p-0 mx-auto mb-24">
                <section>
                    <div className="flex flex-col sm:flex-row">
                        <div className="mr-4 flex flex-row justify-center">
                            <Image className="rounded-full border-4 border-amber-500 aspect-square" loader={imageLoader}
                                   placeholder="blur"
                                   loading="eager"
                                   blurDataURL={blurDataURL}
                                   quality={70}
                                   width={300} height={300} src={src}
                                   alt="Profile photo of Oleksii Popov"/>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="mb-2 text-xl">Hi, I&apos;m Oleksii Popov,</div>
                            <div className="mb-4 text-xl">Fullstack Software Engineer</div>
                            <div className="mb-4">I develop solutions with React, NodeJS, JavaScript, TypeScript and AWS</div>
                        </div>
                    </div>
                    <p className="mb-4">If you are curious about my work experience, <Link className="font-bold"
                                                                              href={"/resume"}>check the CV</Link>
                    </p>
                    <p className="mb-4">Some of work examples could be found in the <Link className="font-bold"
                                                                              href={"/portfolio"}>portfolio</Link>
                    </p>
                    <p className="mb-4">Sometimes I notice and create interesting solutions in
                        front-end, cloud and back-end areas and share them <Link className="font-bold"
                                                                                        href={"/blog"}>in my blog</Link>
                    </p>
                    <p className="mb-4">Here are some of the latest articles:</p>
                    <LatestArticles/>
                </section>
            </div>
    </main>)
}
