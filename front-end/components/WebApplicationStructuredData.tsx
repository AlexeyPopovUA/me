import React from "react";
import {WebApplication, WithContext} from "schema-dts";

interface WebApplicationStructuredDataProps {
    name: string;
    description: string;
    url: string;
    authorName: string;
    authorUrl?: string;
    image?: string;
    datePublished?: string;
    sameAs?: string[];
    technologies?: string[];
}

export function WebApplicationStructuredData({
    name,
    description,
    url,
    authorName,
    authorUrl,
    image,
    datePublished,
    sameAs,
    technologies
}: WebApplicationStructuredDataProps) {
    const jsonLd: WithContext<WebApplication> = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: name,
        description: description,
        url: url,
        author: {
            "@type": "Person",
            name: authorName,
            url: authorUrl ?? url
        },
        ...(image ? {image: image} : {}),
        ...(datePublished ? {datePublished: new Date(datePublished).toISOString()} : {}),
        ...(sameAs && sameAs.length > 0 ? {sameAs: sameAs} : {}),
        ...(technologies && technologies.length > 0 ? {keywords: technologies.join(", ")} : {})
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} suppressHydrationWarning />;
}
