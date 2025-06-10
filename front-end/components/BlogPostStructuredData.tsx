import React from 'react';
import { environment } from '@/app/configuration/environment';
import { content } from '@/app/configuration/content';

interface BlogPostStructuredDataProps {
    title: string;
    description: string;
    datePublished: string;
    dateModified?: string;
    author?: string;
    url: string;
    image?: string;
}

export function BlogPostStructuredData({ title, description, datePublished, dateModified, author, url, image }: BlogPostStructuredDataProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description: description,
        datePublished: new Date(datePublished).toISOString(),
        ...(dateModified ? { dateModified: new Date(dateModified).toISOString() } : {}),
        author: {
            '@type': 'Person',
            name: author || content.authorName,
            url: environment.url,
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
        },
        ...(image ? { image: image } : {}),
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} suppressHydrationWarning />;
}
