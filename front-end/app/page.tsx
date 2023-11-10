import Link from "next/link";

import LatestArticles from "@/app/latest-articles";

export default function Home() {
    return (
        <main className="flex flex-col items-center py-4 px-8">
            <div className="text-lg mb-24">
                <section>
                    <p className="mb-4 text-xl">Hi, I`&apos;m Oleksii Popov</p>
                    <p className="mb-4">I develop full stack solutions with React, NodeJS, JavaScript, TypeScript and
                        AWS</p>
                    <p className="mb-4">During my web development work, I meet and create interesting solutions in front-end, cloud and back-end areas.
                        I strongly believe that sharing those things brings much more value, than just using silently. So, that will be the main purpose of my blog.</p>
                    <p className="mb-4">I write articles. Here are some of them:</p>
                </section>
                <section className="pl-4">
                    <LatestArticles/>
                </section>
            </div>
        </main>
    )
}
