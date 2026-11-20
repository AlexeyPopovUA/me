import React from "react";
import {ProfilePage, WithContext} from "schema-dts";

import {content} from "@/app/configuration/content";

interface ProfilePageStructuredDataProps {
    pageName: string;
    personName: string;
    description: string;
    url: string;
    sameAs: string[];
    image?: string;
    personUrl?: string;
}

export function ProfilePageStructuredData({pageName, personName, description, url, sameAs, image, personUrl}: ProfilePageStructuredDataProps) {
    const jsonLd: WithContext<ProfilePage> = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        name: pageName,
        description: description,
        url: url,
        mainEntity: {
            "@type": "Person",
            name: personName,
            jobTitle: content.authorJobTitle,
            url: personUrl ?? url,
            sameAs: sameAs,
            worksFor: {
                "@type": "Organization",
                name: content.coloringMagicArt.name,
                url: content.coloringMagicArt.url,
            },
            ...(image ? {image: image} : {})
        }
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} suppressHydrationWarning />;
}
