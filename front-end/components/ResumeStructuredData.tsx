import React from 'react';
import { WithContext, Person } from 'schema-dts';

import { content } from '@/app/configuration/content';

interface ResumeStructuredDataProps {
    title: string;
    description: string;
    url: string;
    personName: string;
    jobTitle: string;
    skills?: string[];
    image?: string;
}

export function ResumeStructuredData({
    title,
    description,
    url,
    personName,
    jobTitle,
    image
}: ResumeStructuredDataProps) {
    const jsonLd: WithContext<Person> = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': url,
        name: personName,
        jobTitle: jobTitle,
        description: description,
        url: url,
        worksFor: {
            '@type': 'Organization',
            name: content.coloringMagicArt.name,
            url: content.coloringMagicArt.url,
        },
        // additionalType: 'https://schema.org/Resume',
        sameAs: [...Object.values(content.socialLinks)],
        ...(image ? { image: image } : {}),
        email: 'opportunities@oleksiipopov.com',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
            name: title
        }
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} suppressHydrationWarning />;
}
