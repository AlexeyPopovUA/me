import Markdown from "react-markdown";
import React, {PropsWithChildren} from "react";
import emoji from "remark-emoji";
import rehypeHighlight from "rehype-highlight";
import Image from "next/image";
import {imageLoader} from "@/components/ui/image-loader";
import langXml from 'highlight.js/lib/languages/xml';
import langJson from 'highlight.js/lib/languages/json';
import langPlaintext from 'highlight.js/lib/languages/plaintext';

import "highlight.js/styles/github.css";

export const ArticleContent = (props: PropsWithChildren<{}>) => {
    const mdPlugins = [
        [emoji, {accessible: true, emoticon: false}]
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
                    <Image src={props.src}
                           alt={props.alt} width={800} height={500}
                           loader={imageLoader}/>
                );
            },
        }
    ;

    // @ts-ignore
    return <Markdown remarkPlugins={mdPlugins} rehypePlugins={rehypePlugins} components={components}>{props.children}</Markdown>;
};
