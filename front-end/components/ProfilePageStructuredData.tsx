import React from "react";
import {ProfilePage, WithContext} from "schema-dts";

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
            url: personUrl ?? url,
            sameAs: sameAs,
            ...(image ? {image: image} : {})
        }
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} suppressHydrationWarning />;
}
