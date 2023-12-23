import React, {PropsWithChildren} from "react";
import Markdown from "react-markdown";
import emoji from "remark-emoji";
import remarkUnwrapImages from "remark-unwrap-images";
import {PluggableList} from "unified";
import rehypeHighlight from "rehype-highlight";
import langXml from 'highlight.js/lib/languages/xml';
import langJson from 'highlight.js/lib/languages/json';
import langPlaintext from 'highlight.js/lib/languages/plaintext';

import "highlight.js/styles/github.css";

import MDXImage from "@/components/image/mdx-image";

const mdPlugins: PluggableList = [
    [emoji, {accessible: true, emoticon: false}],
    [remarkUnwrapImages]
];

const rhPlugins: PluggableList = [
    [rehypeHighlight, {languages: {http: langXml, json: langJson, plaintext: langPlaintext}}]
]

const cmp = {
    img: MDXImage
};

export const ArticleContent = (props: PropsWithChildren<any>) => <Markdown remarkPlugins={mdPlugins}
                                                                           rehypePlugins={rhPlugins}
                                                                           components={cmp}>{props.children}</Markdown>;
