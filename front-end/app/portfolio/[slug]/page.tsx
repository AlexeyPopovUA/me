import React from "react";
import Link from "next/link";
import {Metadata} from "next";

import {getProjectSlugs} from "@/lib/articles";
import {Gallery} from "@/components/image/gallery";
import Tag from "@/components/primitive/Tag";
import {getInsideImageURL, getOGImageURL, readBlurredImageSrcPair} from "@/lib/image";
import {content} from "@/app/configuration/content";
import {ArticleContainer} from "@/components/ArticleContainer";
import {environment} from "@/app/configuration/environment";
import {ensurePathSlash} from "@/lib/utils";
import {getProjectPathByDirName} from "@/lib/files";
import {getFrontMatterDataByPath} from "@/lib/mdx-utils";
import {ProjectsSchema} from "@/content/projects/projects-schema";
import {ProjectSection} from "./project-section";

export async function generateStaticParams() {
  const allSlugs = await getProjectSlugs();
  return allSlugs.map(slug => ({slug}));
}

type StaticParams = Awaited<ReturnType<typeof generateStaticParams>>[number];
type StaticProps = {
  params: Promise<StaticParams>;
}

export const generateMetadata = async (props: StaticProps): Promise<Metadata> => {
  const frontMatter = await getFrontMatterDataByPath<ProjectsSchema>(getProjectPathByDirName((await props.params).slug));
  const ogImage = getOGImageURL({src: frontMatter.thumbnail});

  return {
    title: `${frontMatter.title} - ${content.authorName}`,
    description: frontMatter.description,
    metadataBase: new URL(environment.url),
    alternates: {
      canonical: ensurePathSlash(`/portfolio/${(await props.params).slug}`)
    },
    openGraph: {
      title: `${frontMatter.title} - ${content.authorName}`,
      description: frontMatter.description,
      images: [
        ogImage
      ]
    }
  };
}

export default async function Post(props: StaticProps) {
  const frontMatter = await getFrontMatterDataByPath<ProjectsSchema>(getProjectPathByDirName((await props.params).slug));
  const imageCfgs: Gallery.Props["imageCfgs"] = await Promise.all(frontMatter.gallery.map(async image => {
    const blurredImageSrcPair = await readBlurredImageSrcPair({src: image});
    const imageURL = getInsideImageURL({src: image, width: 250, height: 250, quality: 75});

    return {
      imageURL,
      src: blurredImageSrcPair.src,
      blurDataURL: blurredImageSrcPair.blurDataURL,
      ratio: blurredImageSrcPair.ratio
    };
  }));

  return (
    <ArticleContainer>
      <h1>{frontMatter.title}</h1>
      <Gallery imageCfgs={imageCfgs}/>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 sm:gap-x-8 gap-y-2 sm:gap-y-10">
        <ProjectSection headerText="Type">
          {frontMatter.type}
        </ProjectSection>
        {frontMatter.company ? <ProjectSection headerText="Company">
          {frontMatter.company}
        </ProjectSection> : null}
        <ProjectSection headerText="Description">
          {frontMatter.description}
        </ProjectSection>
        <ProjectSection headerText="Technologies">
          <div className="flex flex-row flex-wrap gap-2">
            {frontMatter.technologies.map(item => <Tag key={item} item={item}/>)}
          </div>
        </ProjectSection>
        <ProjectSection headerText="Main features">
          <ul>
            {frontMatter["main-features"].map(item => <li key={item}>{item}</li>)}
          </ul>
        </ProjectSection>
        <ProjectSection headerText="My commitment">
          <ul>
            {frontMatter["my-commitment"].map(item => <li key={item}>{item}</li>)}
          </ul>
        </ProjectSection>
        {frontMatter.URL ? <ProjectSection headerText="Links">
          <Link href={frontMatter.URL}>{frontMatter.URL}</Link>
        </ProjectSection> : null}
        {frontMatter.state ? <ProjectSection headerText="Project phase">
          {frontMatter.state}
        </ProjectSection> : null}
      </div>
    </ArticleContainer>
  );
}
