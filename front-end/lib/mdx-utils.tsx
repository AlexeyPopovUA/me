import React, { PropsWithChildren } from 'react';
import emoji from "remark-emoji";
import rehypeRaw from "rehype-raw";
import remarkUnwrapImages from "remark-unwrap-images";
import {compileMDX, MDXRemoteProps} from "next-mdx-remote/rsc";
import Link from 'next/link';
import {read} from "to-vfile";
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import {TestFunction} from "hast-util-is-element";
import MDXImage from "@/components/image/mdx-image";
import {remarkMermaid} from "@/lib/RemarkMermaidPlugin";
import {remarkCode} from "@/lib/RemarkCodeHighlightingPlugin";
import {getInsideImageURL} from "@/lib/image";
import {getOriginalVideoURL} from "@/lib/video";

const componentsForArticles: MDXRemoteProps['components'] = {
    // Note, that MDXImage is a server component, therefore wrapped to match types
    img: (props) => <MDXImage {...props} />,
    table: (props) => (
        <div className="table-wrapper">
            <table {...props} />
        </div>
    ),
    a: (props: PropsWithChildren<{href: string}>) => {
        if (props.href?.includes('.examples.oleksiipopov.com')) {
            return <Link rel="nofollow" href={props.href}>{props.children}</Link>;
        }

        return <Link href={props.href}>{props.children}</Link>;
    },
    ArticleVideo: (props: React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>) => {
        const poster = props.poster ? getInsideImageURL({ src: props.poster, width: 1000, height: 1000 / 1.736 }) : undefined;
        const originalVideoURL = props.src ? getOriginalVideoURL({ src: props.src as string }) : '';

        return (
            <video className="cursor-pointer" width="100%" poster={poster} controls preload="none" loop muted>
                <source src={originalVideoURL} />
                Your browser does not support the video tag.
            </video>
        );
    },
};

export async function getArticleMdxDataByPath({path}: { path: string }) {
  const source = await read(path);

  return compileMDX({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          [
            rehypeRaw,
            {
              passThrough: ['mdxJsxTextElement', 'mdxJsxFlowElement'],
              allowDangerousHtml: true
            },
          ],
          rehypeSlug,
          [rehypeAutolinkHeadings, {
            behavior: 'wrap',
            test: (node: Parameters<TestFunction>[0]) => node.tagName !== 'h1' // Skip h1 headings
          }],
        ],
        remarkPlugins: [
          [remarkMermaid],
          [emoji, {accessible: true, emoticon: false}],
          [remarkUnwrapImages],
          [remarkCode],
          [remarkGfm],
        ],
      }
    },
    components: componentsForArticles
  });
}

export async function getPageMdxDataByPath({path}: { path: string }) {
  const source = await read(path);

  return compileMDX({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [],
        remarkPlugins: [
          [emoji, {accessible: true, emoticon: false}],
          [remarkGfm]
        ],
      }
    }
  });
}

export async function getFrontMatterDataByPath<T>(path: string) {
  const source = await read(path);

  // TODO Think about simply reading the frontmatter instead of compiling the whole MDX
  const result = await compileMDX<T>({
    source,
    options: {
      parseFrontmatter: true
    }
  });

  return result.frontmatter;
}
