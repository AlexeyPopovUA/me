import React from "react";
import {getArticlesSlugs, getFullArticleContent} from "@/lib/articles";
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import emoji from 'remark-emoji';
import Image from "next/image";
import {imageLoader} from "@/components/ui/image";
import langXml from 'highlight.js/lib/languages/xml';
import langJson from 'highlight.js/lib/languages/json';
import langPlaintext from 'highlight.js/lib/languages/plaintext';
import "highlight.js/styles/github.css";

export async function generateStaticParams() {
    const allSlugs = await getArticlesSlugs();
    return allSlugs.map(slug => ({slug}));
}

type StaticProps = {
    params: {
        slug: string;
    }
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#444" offset="20%" />
      <stop stop-color="#333" offset="50%" />
      <stop stop-color="#444" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#444" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
    typeof window === 'undefined'
        ? Buffer.from(str).toString('base64')
        : window.btoa(str);


export default async function Post(props: StaticProps) {
    const post = await getFullArticleContent({slug: props.params.slug});

    const mdPlugins = [
        [emoji, {accessible: true, emoticon: true}]
    ];

    const rehypePlugins = [
        [rehypeHighlight, {languages: {http: langXml, json: langJson, plaintext: langPlaintext}}]
    ]

    // @ts-ignore
    const components =
        {
            // @ts-ignore
            img: (props) => {
                console.log("img -> next Image", props);
                // todo Set image size from MD width/height properties
                return (
                    <Image placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(800, 500))}`} src={props.src}
                           alt={props.alt} width={800} height={500}
                           loader={imageLoader}/>
                );
            },
        }
    ;

    return (
        <article className='prose prose-sm md:prose-base lg:prose-lg prose-pre:bg-white prose-pre:p-0 mx-auto p-4'>
            <h1>{post.title}</h1>
            {/*@ts-ignore*/}
            <Markdown remarkPlugins={mdPlugins} rehypePlugins={rehypePlugins}
                      components={components}>{post.content}</Markdown>
        </article>
    );
}
