import React from "react";
import {Metadata} from "next";

import {getPagePathByDirName} from "@/lib/files";
import {PageSchema} from "@/content/pages/resume/schema";
import Header from "@/app/resume/components/Header";
import Intro from "@/app/resume/components/Intro";
import Skills from "@/app/resume/components/Skills";
import History from "@/app/resume/components/History";
import renderData from "@/app/resume/data/data";
import {content} from "@/app/configuration/content";
import {environment} from "@/app/configuration/environment";
import {ensurePathSlash} from "@/lib/utils";
import {getOGImageURL} from "@/lib/image";
import {getFrontMatterDataByPath} from "@/lib/mdx-utils";
import {ResumeStructuredData} from "@/components/ResumeStructuredData";

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
            <article
                className='prose prose-sm md:prose-base lg:prose-lg prose-pre:bg-white prose-pre:p-0 mx-auto p-4 print:p-0 print:pt-2'>
                <Header user={renderData.user} contacts={renderData.contacts}/>
                <Intro intro={renderData.intro}/>
                <Skills skills={renderData.skills}/>
                <History experience={renderData.experience}/>
            </article>
        </>
    );
}
