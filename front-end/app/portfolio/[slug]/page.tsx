import React from "react";
import {
    getProjectData, getProjectSEOContent,
    getProjectSlugs
} from "@/lib/articles";
import Gallery from "@/components/image/gallery";
import Tag from "@/components/primitive/Tag";
import {ProjectSection} from "@/app/portfolio/[slug]/project-section";

export async function generateStaticParams() {
    const allSlugs = await getProjectSlugs();
    return allSlugs.map(slug => ({slug}));
}

export async function generateMetadata({params}: any) {
    const post = await getProjectSEOContent({slug: params.slug});

    return {
        title: post.title,
        description: post.description
    }
}

type StaticProps = {
    params: {
        slug: string;
    }
}

export default async function Post(props: StaticProps) {
    const post = await getProjectData({slug: props.params.slug});

    return (
        <article className='prose prose-sm md:prose-base lg:prose-lg prose-pre:bg-white prose-pre:p-0 mx-auto p-4'>
            <h1>{post.title}</h1>
            <Gallery images={post.gallery}/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
                <ProjectSection headerText="Description">
                    {post.description}
                </ProjectSection>
                <ProjectSection headerText="Technologies">
                    <div className="flex flex-row flex-wrap gap-2">
                        {post.technologies.map(item => <Tag key={item} item={item}/>)}
                    </div>
                </ProjectSection>
                <ProjectSection headerText="Main features">
                    <ul>
                        {post["main-features"].map(item => <li key={item}>{item}</li>)}
                    </ul>
                </ProjectSection>
                <ProjectSection headerText="My commitment">
                    <ul>
                        {post["my-commitment"].map(item => <li key={item}>{item}</li>)}
                    </ul>
                </ProjectSection>
                <ProjectSection headerText="Type">
                    {post.type}
                </ProjectSection>
                <ProjectSection headerText="Company">
                    {post.company}
                </ProjectSection>
            </div>
        </article>
    );
}
