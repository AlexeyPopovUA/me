import React from 'react';

import { environment } from '@/app/configuration/environment';
import { content } from '@/app/configuration/content';
import type { ContentImageRef } from '@/lib/content-images';
import { buildBlogPostStructuredDataGraph } from '@/lib/structured-data-graph';

interface BlogPostStructuredDataProps {
    title: string;
    description: string;
    datePublished: string;
    dateModified?: string;
    author?: string;
    url: string;
    imageRefs: ContentImageRef[];
    articleBody?: string;
}

export function BlogPostStructuredData({
    title,
    description,
    datePublished,
    dateModified,
    author,
    url,
    imageRefs,
    articleBody,
}: BlogPostStructuredDataProps) {
    const jsonLd = buildBlogPostStructuredDataGraph({
        title,
        description,
        datePublished,
        dateModified,
        author: author || content.authorName,
        url,
        siteUrl: environment.url,
        imageRefs,
        articleBody,
    });

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            suppressHydrationWarning
        />
    );
}
