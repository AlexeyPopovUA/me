import React from "react";
import {getArticlesSlugs, getFullArticleContent} from "@/lib/articles";
import Markdown from 'react-markdown';
import emoji from 'remark-emoji';
import Image from "next/image";
import {imageLoader} from "@/components/ui/image";

export async function generateStaticParams() {
    const allSlugs = await getArticlesSlugs();
    return allSlugs.map(slug => ({slug}));
}

type StaticProps = {
    params: {
        slug: string;
    }
}

export default async function Post(props: StaticProps) {
    const post = await getFullArticleContent({slug: props.params.slug});

    const mdPlugins = [
        [emoji, {accessible: true, emoticon: true}]
    ];

    // @ts-ignore
    const components =
        {
            // @ts-ignore
            img: (props) => (
                <Image src={props.src} alt={props.alt} width={800} loader={imageLoader}/>
            ),
        }
    ;

    return (
        <article className='prose prose-sm md:prose-base lg:prose-lg mx-auto p-4'>
            <h1>{post.title}</h1>
            {/*@ts-ignore*/}
            <Markdown remarkPlugins={mdPlugins} components={components}>{post.content}</Markdown>
        </article>
    );
}
