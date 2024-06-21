import React from "react";

import {getPagePathByDirName, readFrontMatterWithContent} from "@/lib/files";
import {PageSchema} from "@/content/pages/resume/schema";
import Header from "@/app/resume/components/Header";
import Intro from "@/app/resume/components/Intro";
import Skills from "@/app/resume/components/Skills";
import History from "@/app/resume/components/History";
import OwnProjects from "@/app/resume/components/OwnProjects";
import Education from "@/app/resume/components/Education";
import renderData from "@/app/resume/data/data";
import {content} from "@/app/configuration/content";

const pageSlug = "resume";

export async function generateMetadata({params}: any) {
    const {frontMatter} = await readFrontMatterWithContent<PageSchema>(getPagePathByDirName(pageSlug));

    return {
        title: `${frontMatter.title} - ${content.authorName}`,
        description: frontMatter.description,
        keywords: frontMatter.keywords,
        openGraph: {
            title: `${frontMatter.title} - ${content.authorName}`,
            description: frontMatter.description
        },
    }
}

export default async function Post() {
    return (
        <article
            className='prose prose-sm md:prose-base lg:prose-lg prose-pre:bg-white prose-pre:p-0 mx-auto p-4 print:p-0 print:pt-2'>
            <Header user={renderData.user} contacts={renderData.contacts}/>
            <Intro intro={renderData.intro}/>
            <Skills skills={renderData.skills}/>
            <History experience={renderData.experience}/>
            <OwnProjects projects={renderData.ownProjects}/>
            <Education education={renderData.education}/>
        </article>
    );
}
