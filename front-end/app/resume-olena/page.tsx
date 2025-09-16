import React from "react";
import {Metadata} from "next";

import {getPagePathByDirName} from "@/lib/files";
import {PageSchema} from "@/content/pages/resume/schema";
import Header from "@/app/resume-olena/components/Header";
import Skills from "@/app/resume-olena/components/Skills";
import renderData from "@/app/resume-olena/data/data";
import { WorkHistory } from '@/app/resume-olena/components/WorkHistory';
import { Education } from '@/app/resume-olena/components/Education';
import {content} from "@/app/configuration/content";
import {environment} from "@/app/configuration/environment";
import {ensurePathSlash} from "@/lib/utils";
import {getOGImageURL} from "@/lib/image";
import {getFrontMatterDataByPath} from "@/lib/mdx-utils";

const pageSlug = "resume-olena";

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
        keywords: frontMatter.keywords,
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
    return (
        <article
            className='prose prose-sm md:prose-base lg:prose-lg print:prose-xs prose-pre:bg-white prose-pre:p-0 mx-auto p-4 print:p-0 print:pt-2 print:space-y-2 print:leading-tight print:prose-a:no-underline'>
            <Header user={renderData.user} contacts={renderData.contacts} />
            <Skills skills={renderData.skills} />
            <WorkHistory experience={renderData.experience} />
            <Education education={renderData.education} />
        </article>
    );
}
