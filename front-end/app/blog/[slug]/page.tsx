import React from "react";
import {Metadata} from "next";

import {getArticleSEOContent, getArticlesSlugs} from "@/lib/articles";
import GoTop from "@/components/ScrollUpButton";
import {content} from "@/app/configuration/content";
import {getOGImageURL} from "@/lib/image";
import {ArticleContent} from "@/components/article-content";
import {ArticleContainer} from "@/components/ArticleContainer";
import {environment} from "@/app/configuration/environment";
import {ensurePathSlash} from "@/lib/utils";

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
  return (
    (<ArticleContainer>
      <ArticleContent slug={(await props.params).slug}/>
      <GoTop/>
    </ArticleContainer>)
  );
}
