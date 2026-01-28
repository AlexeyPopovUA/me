import React from "react";
import {CollectionPage, WithContext} from "schema-dts";

type CollectionItem = {
    name: string;
    url: string;
};

interface CollectionPageStructuredDataProps {
    title: string;
    description: string;
    url: string;
    items: CollectionItem[];
}

export function CollectionPageStructuredData({title, description, url, items}: CollectionPageStructuredDataProps) {
    const jsonLd: WithContext<CollectionPage> = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: title,
        description: description,
        url: url,
        mainEntity: {
            "@type": "ItemList",
            itemListElement: items.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                    "@type": "WebPage",
                    "@id": item.url,
                    name: item.name
                }
            }))
        }
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} suppressHydrationWarning />;
}
