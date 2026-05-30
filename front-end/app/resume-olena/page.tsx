import React from "react";
import {Metadata} from "next";

import {getPagePathByDirName} from "@/lib/files";
import {PageSchema} from "@/content/pages/resume-olena/schema";
import Header from "@/app/resume-olena/components/Header";
import Intro from "@/app/resume-olena/components/Intro";
import renderData from "@/app/resume-olena/data/data";
import { WorkHistory } from '@/app/resume-olena/components/WorkHistory';
import { Education } from '@/app/resume-olena/components/Education';
import {content} from "@/app/configuration/content";
import {environment} from "@/app/configuration/environment";
import {ensurePathSlash} from "@/lib/utils";
import {getOGImageURL} from "@/lib/image";
import {getFrontMatterDataByPath} from "@/lib/mdx-utils";
import {ResumeStructuredData} from "@/components/ResumeStructuredData";

const pageSlug = "resume-olena";
const defaultThumbnail = "/shared/default_thumbnail_o_p.png";

export async function generateMetadata(): Promise<Metadata> {
    const frontMatter = await getFrontMatterDataByPath<PageSchema>(getPagePathByDirName(pageSlug));
    const ogImage = getOGImageURL({src: frontMatter.thumbnail ?? defaultThumbnail});

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
            url: ensurePathSlash(`/${pageSlug}`),
            type: "website",
            images: [
                ogImage
            ]
        }
    }
}

export default async function Post() {
    const frontMatter = await getFrontMatterDataByPath<PageSchema>(getPagePathByDirName(pageSlug));
    const ogImage = getOGImageURL({src: frontMatter.thumbnail ?? defaultThumbnail});
    const resumeUrl = `${environment.url}${ensurePathSlash(`/${pageSlug}`)}`;

    return (
        <>
            <ResumeStructuredData
                title={`${frontMatter.title} - ${content.authorName}`}
                description={frontMatter.description}
                url={resumeUrl}
                personName={`${renderData.user.name} ${renderData.user.surname}`}
                jobTitle={renderData.user.position || renderData.user.EducationLevel}
                image={ogImage}
            />
            <article className="article-content article-print mx-auto p-4 pt-24 print:p-0 print:pt-1 print:space-y-1 print:leading-tight">
                <Header user={renderData.user} contacts={renderData.contacts} />
                <Intro intro={renderData.intro} />
                <WorkHistory experience={renderData.experience} />
                <Education education={renderData.education} />
            </article>
        </>
    );
}
