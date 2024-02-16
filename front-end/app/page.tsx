import React from "react";
import Image from "next/image";
import Link from "next/link";

import LatestArticles from "@/app/latest-articles";
import {readBlurredImageSrcPair} from "@/lib/image";
import {imageLoader} from "@/components/image/image-loader";

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
                                   alt="My profile photo"/>
                        </div>
                        <div className="flex flex-col justify-center">
                            <p className="mb-4 text-xl">Hi, I&apos;m Oleksii Popov</p>
                            <p className="mb-4">I develop full stack solutions with React, NodeJS, JavaScript,
                                TypeScript and
                                AWS</p>
                        </div>
                    </div>
                    <p className="mb-4">If you are curious about my work experience, <Link className="font-bold"
                                                                              href={"/resume"}>check the CV</Link>
                    </p>
                    <p className="mb-4">Some of work examples could be found in the <Link className="font-bold"
                                                                              href={"/portfolio"}>portfolio</Link>
                    </p>
                    <p className="mb-4">Sometimes I notice and create interesting solutions in
                        front-end, cloud and back-end areas, which could be found <Link className="font-bold"
                                                                                        href={"/blog"}>in my blog</Link>
                    </p>
                    <p className="mb-4">Here are some of the latest articles:</p>
                    <LatestArticles/>
                </section>
            </div>
    </main>)
}
