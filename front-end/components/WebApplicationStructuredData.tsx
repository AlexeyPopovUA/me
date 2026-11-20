import React from 'react';

import { environment } from '@/app/configuration/environment';
import type { ContentImageRef } from '@/lib/content-images';
import { buildProjectStructuredDataGraph } from '@/lib/structured-data-graph';

interface WebApplicationStructuredDataProps {
    name: string;
    description: string;
    url: string;
    authorName: string;
    authorUrl?: string;
    datePublished?: string;
    sameAs?: string[];
    technologies?: string[];
    imageRefs: ContentImageRef[];
    applicationCategory?: string;
}

export function WebApplicationStructuredData({
    name,
    description,
    url,
    authorName,
    authorUrl,
    datePublished,
    sameAs,
    technologies,
    imageRefs,
    applicationCategory,
}: WebApplicationStructuredDataProps) {
    const jsonLd = buildProjectStructuredDataGraph({
        name,
        description,
        url,
        siteUrl: environment.url,
        authorName,
        authorUrl: authorUrl ?? environment.url,
        datePublished,
        sameAs,
        technologies,
        imageRefs,
        applicationCategory,
    });

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            suppressHydrationWarning
        />
    );
}
