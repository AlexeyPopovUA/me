import React from "react";
import {
    getProjectData, getProjectSEOContent,
    getProjectSlugs
} from "@/lib/articles";

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
            <div>{post.technologies}</div>
            <div>{post.type}</div>
            <div>{post.description}</div>
            <div>{post.company}</div>
            <div>{post.thumbnail}</div>
            <div>{post["main-features"]}</div>
            <div>{post["my-commitment"]}</div>
        </article>
    );
}
