import React from "react";
import {Metadata} from "next";

import {getPagePathByDirName} from "@/lib/files";
import {PageSchema} from "@/content/pages/resume/schema";
import Header from "@/app/resume-print/components/Header";
import Intro from "@/app/resume-print/components/Intro";
import Skills from "@/app/resume-print/components/Skills";
import renderData from "@/app/resume/data/data";
import {content} from "@/app/configuration/content";
import {environment} from "@/app/configuration/environment";
import {ensurePathSlash} from "@/lib/utils";
import {getOGImageURL} from "@/lib/image";
import {getFrontMatterDataByPath} from "@/lib/mdx-utils";
import {ResumeStructuredData} from "@/components/ResumeStructuredData";
import { WorkHistory } from '@/app/resume-print/components/WorkHistory';
import { Education } from '@/app/resume-print/components/Education';

const pageSlug = "resume";

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
        robots: {
            index: false,
            follow: true,
        },
        openGraph: {
            title: `${frontMatter.title} - ${content.authorName}`,
            description: frontMatter.description,
            url: ensurePathSlash("/resume-print"),
            type: "website",
            images: [
                ogImage
            ]
        }
    }
}

export default async function Post() {
    const frontMatter = await getFrontMatterDataByPath<PageSchema>(getPagePathByDirName(pageSlug));
    const ogImage = getOGImageURL({src: frontMatter.thumbnail});
    const resumeUrl = `${environment.url}${ensurePathSlash(`/${pageSlug}`)}`;

    return (
        <>
            <ResumeStructuredData
                title={`${frontMatter.title} - ${content.authorName}`}
                description={frontMatter.description}
                url={resumeUrl}
                personName={`${renderData.user.name} ${renderData.user.surname}`}
                jobTitle={renderData.user.position}
                image={ogImage}
            />
            <article className='article-content article-print mx-auto p-4 pt-24 print:p-0 print:pt-1 print:space-y-1 print:leading-tight'>
                <Header user={renderData.user} contacts={renderData.contacts}/>
                <Intro intro={renderData.intro}/>
                <Skills skills={renderData.skills}/>
                <WorkHistory experience={renderData.experience} />
                <Education education={renderData.education} />
            </article>
        </>
    );
}