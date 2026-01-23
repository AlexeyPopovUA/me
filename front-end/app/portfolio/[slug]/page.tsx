import React from "react";
import {Metadata} from "next";

import {getProjectSlugs} from "@/lib/articles";
import {Carousel} from "@/components/image/carousel";
import {getInsideImageURL, getOGImageURL} from "@/lib/image";
import {readBlurredImageSrcPair} from "@/lib/image-server";
import {content} from "@/app/configuration/content";
import {ArticleContainer} from "@/components/ArticleContainer";
import {environment} from "@/app/configuration/environment";
import {ensurePathSlash} from "@/lib/utils";
import {getProjectPathByDirName} from "@/lib/files";
import {getFrontMatterDataByPath, getProjectMdxDataByPath} from "@/lib/mdx-utils";
import {ProjectsSchema} from "@/content/projects/projects-schema";
import Tag from "@/components/primitive/Tag";

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
  const slug = (await props.params).slug;
  const projectPath = getProjectPathByDirName(slug);

  // Get both frontmatter and MDX content
  const { content: mdxContent, frontmatter } = await getProjectMdxDataByPath({path: projectPath});

  const imageCfgs: Carousel.Props["imageCfgs"] = await Promise.all(frontmatter.gallery.map(async image => {
    const blurredImageSrcPair = await readBlurredImageSrcPair({src: image});
    const imageURL = getInsideImageURL({src: image, width: 900, height: 900, quality: 75});

    return {
      imageURL,
      src: blurredImageSrcPair.src,
      blurDataURL: blurredImageSrcPair.blurDataURL,
      ratio: blurredImageSrcPair.ratio
    };
  }));

  return (
    <ArticleContainer>
      <h1>{frontmatter.title}</h1>
      <Carousel imageCfgs={imageCfgs} projectType={frontmatter.type} />

      {/* Technologies tag list */}
      {frontmatter.technologies && frontmatter.technologies.length > 0 && (
        <div className="text-md text-gray-600 mt-8 flex flex-row flex-wrap gap-2 justify-center max-w-4xl mx-auto">
          {frontmatter.technologies.map(tech => <Tag key={tech} item={tech}/>)}
        </div>
      )}

      {/* Render MDX content instead of structured sections */}
      {mdxContent}
    </ArticleContainer>
  );
}
