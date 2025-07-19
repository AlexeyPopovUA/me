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
        // additionalType: 'https://schema.org/Resume',
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
        ],
        ...(image ? { image: image } : {}),
        //...(skills.length > 0 ? { knowsAbout: skills.join(', ') } : {}),
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
            name: title
        }
    };

    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} suppressHydrationWarning />;
}
