import React from 'react';
import { Person, WebSite, WithContext } from 'schema-dts';

import { content } from '@/app/configuration/content';

interface HomePageStructuredDataProps {
    title: string;
    description: string;
    name: string;
    jobTitle: string;
    url: string;
    image?: string;
}

export function HomePageStructuredData({ title, description, name, jobTitle, url, image }: HomePageStructuredDataProps) {
    const websiteLd: WithContext<WebSite> = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: title,
        description: description,
        url: url,
        inLanguage: 'en',
        publisher: {
            '@type': 'Person',
            name: name,
            url: url,
        },
    };

    const personLd: WithContext<Person> = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: name,
        jobTitle: jobTitle,
        description: description,
        url: url,
        sameAs: [
            content.socialLinks.github,
            content.socialLinks.gitlab,
            content.socialLinks.npm,
            content.socialLinks.linkedin,
            content.socialLinks.twitter,
            content.socialLinks.gumroad,
            content.socialLinks.rok,
            content.socialLinks.medium,
            content.socialLinks.wko,
            content.socialLinks.devto,
            content.socialLinks.braintrust,
            content.socialLinks.freelancetribes,
            content.socialLinks.buffer_start_page,
            content.socialLinks.cal_com,
            content.socialLinks.producthunt,
        ],
        ...(image ? { image: image } : {}),
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
        },
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} suppressHydrationWarning />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} suppressHydrationWarning />
        </>
    );
}
