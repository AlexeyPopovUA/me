import React, {useMemo} from "react";

import {getPagePathByDirName, readFrontMatterWithContent} from "@/lib/files";
import {PageSchema} from "@/content/pages/resume/schema";
import Header from "@/app/resume/components/Header";
import Intro from "@/app/resume/components/Intro";
import Skills from "@/app/resume/components/Skills";
import History from "@/app/resume/components/History";
import OwnProjects from "@/app/resume/components/OwnProjects";
import Education from "@/app/resume/components/Education";
import data from "@/app/resume/data/data";
import content from "@/app/configuration/content";

const pageSlug = "resume";

async function getPost({slug}: { slug: string }) {
    const {frontMatter, content} = await readFrontMatterWithContent<PageSchema>(getPagePathByDirName(pageSlug));

    return {
        frontMatter,
        slug,
        content
    }
}

export async function generateMetadata({params}: any) {
    const page = await getPost(params);

    return {
        title: `${page.frontMatter.title} - ${content.authorName}`,
        description: page.frontMatter.description,
        keywords: page.frontMatter.keywords,
        openGraph: {
            title: `${page.frontMatter.title} - ${content.authorName}`,
            description: page.frontMatter.description
        },
    }
}

export default async function Post() {
    const renderData = useMemo(() => data, []);

    return (
        <article className='prose prose-sm md:prose-base lg:prose-lg prose-pre:bg-white prose-pre:p-0 mx-auto p-4 print:p-0 print:pt-2'>
            <Header user={renderData.user} contacts={renderData.contacts}/>
            <Intro intro={renderData.intro}/>
            <Skills skills={renderData.skills}/>
            <History experience={renderData.experience}/>
            <OwnProjects projects={renderData.ownProjects}/>
            <Education education={renderData.education}/>
        </article>
    );
}
