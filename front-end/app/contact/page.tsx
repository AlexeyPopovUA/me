import React from "react";
import {Metadata} from "next";

import {getPagePathByDirName} from "@/lib/files";
import {PageSchema} from "@/content/pages/contact/schema";
import {content} from "@/app/configuration/content";
import {getOGImageURL} from "@/lib/image";
import {environment} from "@/app/configuration/environment";
import {ensurePathSlash} from "@/lib/utils";
import {getFrontMatterDataByPath} from "@/lib/mdx-utils";
import ContactPageClient from "./contact-page-client";
import {ContactPageStructuredData} from "@/components/ContactPageStructuredData";

const pageSlug = "contact";

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
    const frontMatter = await getFrontMatterDataByPath<PageSchema>(getPagePathByDirName(pageSlug));
    const ogImage = getOGImageURL({src: frontMatter.thumbnail});
    const pageUrl = `${environment.url}${ensurePathSlash(`/${pageSlug}`)}`;
    const sameAs = Object.values(content.socialLinks);

    return (
        <>
            <ContactPageStructuredData
                pageName={`${frontMatter.title} - ${content.authorName}`}
                personName={content.authorName}
                description={frontMatter.description}
                url={pageUrl}
                sameAs={sameAs}
                image={ogImage}
                personUrl={environment.url}
            />
            <ContactPageClient />
        </>
    );
}
