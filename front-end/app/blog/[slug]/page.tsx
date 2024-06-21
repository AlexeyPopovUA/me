import React from "react";
import {getArticleSEOContent, getArticlesSlugs} from "@/lib/articles";
import GoTop from "@/components/ScrollUpButton";
import {content} from "@/app/configuration/content";
import {getOGImageURL} from "@/lib/image";
import {MermaidInitializer} from "@/lib/RemarkMermaidPlugin";
import {ArticleContent} from "@/components/article-content";
import {ArticleContainer} from "@/components/image/ArticleContainer";

export async function generateStaticParams() {
    const allSlugs = await getArticlesSlugs();
    return allSlugs.map(slug => ({slug}));
}

type StaticParams = Awaited<ReturnType<typeof generateStaticParams>>[number];
type StaticProps = {
    params: StaticParams;
}

export const generateMetadata = async (props: StaticProps) => {
    const post = await getArticleSEOContent({slug: props.params.slug});
    const ogImage = getOGImageURL({src: post.thumbnail});

    return {
        title: `${post.title} - ${content.authorName}`,
        description: post.description,
        keywords: post.keywords,
        openGraph: {
            title: `${post.title} - ${content.authorName}`,
            description: post.description,
            images: [
                ogImage
            ]
        }
    }
}

export default async function Post(props: StaticProps) {
    return (
        <ArticleContainer>
            <ArticleContent slug={props.params.slug}/>
            <GoTop/>
            <MermaidInitializer/>
        </ArticleContainer>
    );
}
