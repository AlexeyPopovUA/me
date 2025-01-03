import React from "react";
import {Metadata} from "next";

import {getArticleSEOContent, getArticlesSlugs} from "@/lib/articles";
import GoTop from "@/components/ScrollUpButton";
import {content} from "@/app/configuration/content";
import {getOGImageURL} from "@/lib/image";
import {ArticleContainer} from "@/components/ArticleContainer";
import {environment} from "@/app/configuration/environment";
import {ensurePathSlash} from "@/lib/utils";
import {getArticleMdxDataByPath} from "@/lib/mdx-utils";
import {getArticlePathByDirName} from "@/lib/files";
import {readTOC} from "@/lib/toc-parser";
import TableOfContents from "@/components/TableOfContents";

export async function generateStaticParams() {
  const allSlugs = await getArticlesSlugs();
  return allSlugs.map(slug => ({slug}));
}

type StaticParams = Awaited<ReturnType<typeof generateStaticParams>>[number];
type StaticProps = {
  params: Promise<StaticParams>;
}

export const generateMetadata = async (props: StaticProps): Promise<Metadata> => {
  const post = await getArticleSEOContent({slug: (await props.params).slug});
  const ogImage = getOGImageURL({src: post.thumbnail});

  return {
    title: `${post.title} - ${content.authorName}`,
    description: post.description,
    metadataBase: new URL(environment.url),
    alternates: {
      canonical: ensurePathSlash(`/blog/${(await props.params).slug}`)
    },
    keywords: post.keywords,
    openGraph: {
      title: `${post.title} - ${content.authorName}`,
      description: post.description,
      images: [
        ogImage
      ]
    }
  };
}

export default async function Post(props: StaticProps) {
  const slug = (await props.params).slug;
  const path = getArticlePathByDirName(slug);

  // TODO Avoid double file reading
  const {content} = await getArticleMdxDataByPath({path});
  const toc = await readTOC({path});

  return (
    <ArticleContainer>
      {content}

      <GoTop/>

      {/* Fixed sidebar TOC */}
      <div className="fixed top-24 left-4 w-60 hidden xl:block">
        <TableOfContents
          heading={toc!}
          className="bg-slate-50 p-4 rounded-lg"
        />
      </div>

      {/* Mobile/responsive TOC */}
      {/*<div className="lg:hidden mb-8">
        <TableOfContents
          heading={toc!}
          className="bg-gray-50 p-4 rounded-lg"
        />
      </div>*/}
    </ArticleContainer>
  );
}
