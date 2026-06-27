import React from "react";
import {Metadata} from "next";

import {getProjectSlugs} from "@/lib/articles";
import {Carousel} from "@/components/image/carousel";
import {getInsideImageURL, getOGImageURL} from "@/lib/image";
import {getTwitterMetadata} from "@/lib/metadata";
import {readBlurredImageSrcPair} from "@/lib/image-server";
import {content} from "@/app/configuration/content";
import {ArticleContainer} from "@/components/ArticleContainer";
import {environment} from "@/app/configuration/environment";
import {ensurePathSlash} from "@/lib/utils";
import {getProjectPathByDirName} from "@/lib/files";
import {extractProjectImageRefs, THUMBNAIL_ANCHOR_ID} from "@/lib/content-images";
import {getFrontMatterDataByPath, getProjectMdxDataByPath} from "@/lib/mdx-utils";
import {readMdxBodyByPath} from "@/lib/mdx-source";
import {ProjectsSchema} from "@/content/projects/projects-schema";
import {WebApplicationStructuredData} from "@/components/WebApplicationStructuredData";
import {ArticleByline} from "@/components/ArticleByline";
import {buildContentAlternates} from "@/lib/markdown-alternates";

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
    alternates: buildContentAlternates(`/portfolio/${(await props.params).slug}`),
    openGraph: {
      title: `${frontMatter.title} - ${content.authorName}`,
      description: frontMatter.description,
      url: ensurePathSlash(`/portfolio/${(await props.params).slug}`),
      type: "website",
      images: [
        ogImage
      ]
    },
    twitter: getTwitterMetadata({
      title: `${frontMatter.title} - ${content.authorName}`,
      description: frontMatter.description,
      images: [ogImage],
    }),
  };
}

export default async function Post(props: StaticProps) {
  const slug = (await props.params).slug;
  const projectPath = getProjectPathByDirName(slug);

  const [{ content: mdxContent, frontmatter }, body] = await Promise.all([
    getProjectMdxDataByPath({path: projectPath}),
    readMdxBodyByPath(projectPath),
  ]);
  const pageUrl = `${environment.url}${ensurePathSlash(`/portfolio/${slug}`)}`;
  const sameAs = frontmatter.URL ? [frontmatter.URL] : undefined;
  const imageRefs = extractProjectImageRefs(body, {
    thumbnail: frontmatter.thumbnail,
    gallery: frontmatter.gallery,
    galleryAlt: frontmatter.galleryAlt,
    title: frontmatter.title,
  });

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
    <>
      <WebApplicationStructuredData
        name={frontmatter.title}
        description={frontmatter.description}
        url={pageUrl}
        authorName={content.authorName}
        authorUrl={environment.url}
        datePublished={frontmatter.date}
        sameAs={sameAs}
        technologies={frontmatter.technologies}
        imageRefs={imageRefs}
      />
      <ArticleContainer>
        {imageRefs.some((image) => image.anchorId === THUMBNAIL_ANCHOR_ID) ? (
          <span id={THUMBNAIL_ANCHOR_ID} className="sr-only" aria-hidden="true" />
        ) : null}
        <h1>{frontmatter.title}</h1>
        <ArticleByline date={frontmatter.date} lastMod={frontmatter.lastMod} />
        <Carousel
          imageCfgs={imageCfgs}
          projectType={frontmatter.type}
          projectTitle={frontmatter.title}
          galleryAlt={frontmatter.galleryAlt}
        />

        {/* Technologies tag list */}
        {frontmatter.technologies && frontmatter.technologies.length > 0 && (
          <div className="flex flex-row flex-wrap gap-2 justify-center max-w-4xl mx-auto mt-8">
            {frontmatter.technologies.map(tech => (
              <span key={tech} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Render MDX content instead of structured sections */}
        {mdxContent}
      </ArticleContainer>
    </>
  );
}
