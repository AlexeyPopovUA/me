import React from "react";
import {ContactPage, WithContext} from "schema-dts";

interface ContactPageStructuredDataProps {
    pageName: string;
    personName: string;
    description: string;
    url: string;
    sameAs: string[];
    image?: string;
    personUrl?: string;
}

export function ContactPageStructuredData({pageName, personName, description, url, sameAs, image, personUrl}: ContactPageStructuredDataProps) {
    const jsonLd: WithContext<ContactPage> = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
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
