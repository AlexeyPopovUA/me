import React from "react";
import Image from "next/image";

import LatestArticles from "@/app/latest-articles";
import {readBlurredImageSrcPair} from "@/lib/image";
import {imageLoader} from "@/components/image/image-loader";

export default async function Home() {
    const {src, blurDataURL} = await readBlurredImageSrcPair({src: "/pages/home/me-w-square-bg.jpg"});

    return (
        <main className="flex flex-col items-center py-4 px-8">
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

                    <p className="mb-4">During my web development work, I meet and create interesting solutions in
                        front-end, cloud and back-end areas.
                        I strongly believe that sharing those things brings much more value, than just using silently.
                        So, that will be the main purpose of my blog.</p>
                    <p className="mb-4">Also, I write articles. Here are some of them:</p>
                </section>
                <section className="pl-4">
                    <LatestArticles/>
                </section>
            </div>
        </main>
    )
}
