import React from 'react';

import { content } from '@/app/configuration/content';
import { buildHomeStructuredData } from '@/lib/structured-data';

interface HomePageStructuredDataProps {
    title: string;
    description: string;
    name: string;
    jobTitle: string;
    url: string;
    image?: string;
}

export function HomePageStructuredData({ title, description, name, jobTitle, url, image }: HomePageStructuredDataProps) {
    const { website, organization, person } = buildHomeStructuredData({
        title,
        description,
        name,
        jobTitle,
        url,
        image,
        sameAs: Object.values(content.socialLinks),
    });

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} suppressHydrationWarning />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} suppressHydrationWarning />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} suppressHydrationWarning />
        </>
    );
}
