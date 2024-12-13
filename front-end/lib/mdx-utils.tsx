import MDXImage from "@/components/image/mdx-image";
import {PluggableList} from "unified";
import {remarkMermaid} from "@/lib/RemarkMermaidPlugin";
import emoji from "remark-emoji";
import remarkUnwrapImages from "remark-unwrap-images";
import {remarkCode} from "@/lib/RemarkCodeHighlightingPlugin";
import rehypeRaw from "rehype-raw";
import {compileMDX, MDXRemoteProps} from "next-mdx-remote/rsc";
import {read} from "to-vfile";
import remarkGfm from 'remark-gfm'
import React from "react";
import {getInsideImageURL} from "@/lib/image";
import {getOriginalVideoURL} from "@/lib/video";

const cmp = {
  // Note, that MDXImage is a server component, therefore wrapped to match types
  // @ts-expect-error - todo > add proper types later
  img: (props) => <MDXImage {...props} />,
  // @ts-expect-error - todo > add proper types later
  table: (props) => <div className="table-wrapper">
    <table {...props} />
  </div>,
  ArticleVideo: (props: React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>) => {
    const poster = props.poster ? getInsideImageURL({src: props.poster, width: 1000, height: 1000 / 1.736}) : undefined;
    const originalVideoURL = props.src ? getOriginalVideoURL({src: props.src}) : "";

    return <video className="cursor-pointer" width="100%" poster={poster} controls preload="none" loop muted>
      <source src={originalVideoURL}/>
      Your browser does not support the video tag.
    </video>;
  },
};

const mdPlugins: PluggableList = [
  [remarkMermaid],
  [emoji, {accessible: true, emoticon: false}],
  [remarkUnwrapImages],
  [remarkCode],
  [remarkGfm]
];
const rhPlugins: PluggableList = [
  [rehypeRaw, {passThrough: ['mdxJsxTextElement', 'mdxJsxFlowElement'], allowDangerousHtml: true}],
];

const options: MDXRemoteProps["options"] = {
  parseFrontmatter: true,
  mdxOptions: {
    rehypePlugins: rhPlugins,
    remarkPlugins: mdPlugins,
  }
}

export const getMdxDataByPath = async ({path}: { path: string }) => {
  const source = await read(path);
  return compileMDX({source, options, components: cmp});
}