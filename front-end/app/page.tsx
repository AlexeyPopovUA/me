import Link from "next/link";

import LatestArticles from "@/app/latest-articles";

export default function Home() {
    return (
        <main className="flex flex-col items-center py-4 px-8">
            <div className="mb-12 flex place-items-center">
                <h1 className="text-2xl">Software development blog and portfolio</h1>
            </div>
            <div className="text-lg mb-24">
                <section>
                    <p className="mb-4 text-xl">Hi, I`&apos;m Oleksii Popov</p>
                    <p className="mb-4">I develop full stack solutions with React, NodeJS, JavaScript, TypeScript and
                        AWS</p>
                    <div className="mb-4">You can find my CV <Link href="/cv"
                                                                   className="font-semibold accent-slate-500">here</Link>
                    </div>
                    <p className="mb-4">Sometimes, I write articles. Here are some of them:</p>
                </section>
                <section className="pl-4">
                    <LatestArticles/>
                </section>
            </div>
        </main>
    )
}
