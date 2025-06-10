import React from 'react';
import { content } from '@/app/configuration/content';

interface HomePageStructuredDataProps {
    title: string;
    description: string;
    name: string;
    jobTitle: string;
    url: string;
    image?: string;
}

export function HomePageStructuredData({ description, name, jobTitle, url, image }: HomePageStructuredDataProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: name,
        jobTitle: jobTitle,
        description: description,
        url: url,
        sameAs: [
            content.socialLinks.github,
            content.socialLinks.linkedin,
            content.socialLinks.twitter,
        ],
        ...(image ? { image: image } : {}),
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
        },
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} suppressHydrationWarning />;
}
