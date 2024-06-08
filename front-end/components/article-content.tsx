import React, {PropsWithChildren} from "react";
import Markdown from "react-markdown";
import emoji from "remark-emoji";
import remarkUnwrapImages from "remark-unwrap-images";
import {PluggableList} from "unified";
import rehypeHighlight from "rehype-highlight";
import langXml from 'highlight.js/lib/languages/xml';
import langJson from 'highlight.js/lib/languages/json';
import langPlaintext from 'highlight.js/lib/languages/plaintext';
import rehypeRaw from "rehype-raw";

import "highlight.js/styles/github.css";

import MDXImage from "@/components/image/mdx-image";
import {remarkMermaid} from "@/lib/RemarkMermaidPlugin";

const mdPlugins: PluggableList = [
    [remarkMermaid],
    [emoji, {accessible: true, emoticon: false}],
    [remarkUnwrapImages]
];

const rhPlugins: PluggableList = [
    [rehypeRaw],
    [rehypeHighlight, {languages: {http: langXml, json: langJson, plaintext: langPlaintext}}]
]

const cmp = {
    // Note, that MDXImage is a server component, therefore wrapped to match types
    img: (props: any) => <MDXImage {...props} />
};

export const ArticleContent = (props: PropsWithChildren<any>) => <>
    <Markdown remarkPlugins={mdPlugins}
              rehypePlugins={rhPlugins}
              components={cmp}>{props.children}</Markdown>
</>;
