import React from "react";
import {getArticleSEOContent, getArticlesSlugs, getFullArticleContent} from "@/lib/articles";
import {ArticleContent} from "@/components/article-content";

export async function generateStaticParams() {
    const allSlugs = await getArticlesSlugs();
    return allSlugs.map(slug => ({slug}));
}

export async function generateMetadata({params}: any) {
    const post = await getArticleSEOContent({slug: params.slug});

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
    const post = await getFullArticleContent({slug: props.params.slug});

    return (
        <article className='prose prose-sm md:prose-base lg:prose-lg prose-pre:bg-white prose-pre:p-0 mx-auto p-4'>
            <h1>{post.title}</h1>
            <ArticleContent>{post.content}</ArticleContent>
        </article>
    );
}
