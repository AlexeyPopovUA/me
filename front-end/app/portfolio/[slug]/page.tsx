import React from "react";
import Link from "next/link";

import {getProjectData, getProjectSEOContent, getProjectSlugs} from "@/lib/articles";
import Gallery from "@/components/image/gallery";
import Tag from "@/components/primitive/Tag";
import {ProjectSection} from "./project-section";
import {getOGImageURL, readBlurredImageSrcPair} from "@/lib/image";
import {content} from "@/app/configuration/content";
import {ArticleContainer} from "@/components/image/ArticleContainer";
import {environment} from "@/app/configuration/environment";
import {ensurePathSlash} from "@/lib/utils";
import {Metadata} from "next";

export async function generateStaticParams() {
    const allSlugs = await getProjectSlugs();
    return allSlugs.map(slug => ({slug}));
}

type StaticParams = Awaited<ReturnType<typeof generateStaticParams>>[number];
type StaticProps = {
    params: StaticParams;
}

export const generateMetadata = async (props: StaticProps): Promise<Metadata> => {
    const {frontMatter} = await getProjectSEOContent({slug: props.params.slug});
    const ogImage = getOGImageURL({src: frontMatter.thumbnail});

    return {
        title: `${frontMatter.title} - ${content.authorName}`,
        description: frontMatter.description,
        metadataBase: new URL(environment.url),
        alternates: {
            canonical: ensurePathSlash(`/portfolio/${props.params.slug}`)
        },
        openGraph: {
            title: `${frontMatter.title} - ${content.authorName}`,
            description: frontMatter.description,
            images: [
                ogImage
            ]
        }
    }
}

export default async function Post(props: StaticProps) {
    const {frontMatter} = await getProjectData({slug: props.params.slug});
    const imageCfgs = await Promise.all(frontMatter.gallery.map(image => readBlurredImageSrcPair({src: image})));

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
