import React from "react";
import {Metadata} from "next";

import {getPagePathByDirName} from "@/lib/files";
import {PageSchema} from "@/content/pages/portfolio/schema";
import AllProjects from "@/app/portfolio/all-projects";
import {content} from "@/app/configuration/content";
import {getOGImageURL} from "@/lib/image";
import {environment} from "@/app/configuration/environment";
import {ensurePathSlash} from "@/lib/utils";
import {getFrontMatterDataByPath} from "@/lib/mdx-utils";
import {getAllProjects} from "@/lib/articles";
import {CollectionPageStructuredData} from "@/components/CollectionPageStructuredData";

const pageSlug = "portfolio";

export async function generateMetadata(): Promise<Metadata> {
    const frontMatter = await getFrontMatterDataByPath<PageSchema>(getPagePathByDirName(pageSlug));
    const ogImage = getOGImageURL({src: frontMatter.thumbnail});

    return {
        title: `${frontMatter.title} - ${content.authorName}`,
        description: frontMatter.description,
        metadataBase: new URL(environment.url),
        alternates: {
            canonical: ensurePathSlash(`/${pageSlug}`)
        },
        openGraph: {
            title: `${frontMatter.title} - ${content.authorName}`,
            description: frontMatter.description,
            url: ensurePathSlash(`/${pageSlug}`),
            type: "website",
            images: [
                ogImage
            ]
        }
    }
}

export default async function Post() {
    const [frontMatter, projects] = await Promise.all([
        getFrontMatterDataByPath<PageSchema>(getPagePathByDirName(pageSlug)),
        getAllProjects()
    ]);
    const pageUrl = `${environment.url}${ensurePathSlash(`/${pageSlug}`)}`;
    const items = projects.map(project => ({
        name: project.title,
        url: `${environment.url}${ensurePathSlash(`/portfolio/${project.slug}`)}`
    }));

    return (
        <>
            <CollectionPageStructuredData
                title={`${frontMatter.title} - ${content.authorName}`}
                description={frontMatter.description}
                url={pageUrl}
                items={items}
            />
            <main className="min-h-screen bg-background">
                {/* Hero Section */}
                <section className="pt-32 pb-16 px-6">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                                <span className="gradient-text">Portfolio</span>
                            </h1>
                            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
                                A collection of projects showcasing my expertise in full-stack development,
                                from enterprise applications to personal experiments.
                            </p>
                        </div>

                        {/* Projects Grid */}
                        <AllProjects projects={projects} />
                    </div>
                </section>
            </main>
        </>
    );
}
