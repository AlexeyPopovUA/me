import React from "react";
import {Metadata} from "next";

import {getPagePathByDirName} from "@/lib/files";
import {PageSchema} from "@/content/pages/contact/schema";
import {content} from "@/app/configuration/content";
import {getOGImageURL} from "@/lib/image";
import {environment} from "@/app/configuration/environment";
import {ensurePathSlash} from "@/lib/utils";
import {getFrontMatterDataByPath, getPageMdxDataByPath} from "@/lib/mdx-utils";

const pageSlug = "contact";

export async function generateMetadata(): Promise<Metadata> {
    const frontMatter = await getFrontMatterDataByPath<PageSchema>(getPagePathByDirName(pageSlug));
    const ogImage = getOGImageURL({src: frontMatter.thumbnail});

    return {
        title: `${frontMatter.title} - ${content.authorName}`,
        description: frontMatter.description,
        metadataBase: new URL(environment.url),
        alternates: {
            canonical: ensurePathSlash(`/${pageSlug}`)
        },
        openGraph: {
            title: `${frontMatter.title} - ${content.authorName}`,
            description: frontMatter.description,
            images: [
                ogImage
            ]
        }
    }
}

export default async function Post() {
    const {content: mdxContent} = await getPageMdxDataByPath({path: getPagePathByDirName(pageSlug)});

    return (
        <main className="min-h-screen bg-background">
            <section className="pt-32 pb-16 px-6">
                <div className="container mx-auto max-w-4xl">
                    <article className='prose prose-sm md:prose-base lg:prose-lg prose-pre:bg-white dark:prose-pre:bg-slate-900 prose-pre:p-0 mx-auto'>
                        {mdxContent}
                    </article>
                </div>
            </section>
        </main>
    );
}
