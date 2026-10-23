import { content } from '@/app/configuration/content';
import { environment } from '@/app/configuration/environment';
import { getOGImageURL } from '@/lib/image';

export function getPublisher() {
    return {
        '@type': 'Person' as const,
        name: content.authorName,
        url: environment.url,
        image: getOGImageURL({ src: '/shared/default_thumbnail_o_p.png' }),
    };
}

export interface HomeStructuredDataInput {
    title: string;
    description: string;
    name: string;
    jobTitle: string;
    url: string;
    image?: string;
    sameAs: readonly string[];
}

/**
 * Homepage entities for a sole proprietor.
 *
 * The WKO registration and the site are in the author's own name, so the
 * Organization is that professional brand, not a separate company. Person
 * points at it with worksFor and brand. WebSite.publisher is the Organization
 * so auditors that require an Organization (or a Person with worksFor/brand)
 * can resolve one graph.
 */
export function buildHomeStructuredData(input: HomeStructuredDataInput) {
    const site = input.url.replace(/\/$/, '');
    const organizationId = `${site}/#organization`;
    const personId = `${site}/#person`;
    const websiteId = `${site}/#website`;
    const brand = {
        '@type': 'Brand' as const,
        name: input.name,
        url: site,
    };

    return {
        website: {
            '@context': 'https://schema.org',
            '@type': 'WebSite' as const,
            '@id': websiteId,
            name: input.title,
            description: input.description,
            url: site,
            inLanguage: 'en',
            publisher: {
                '@type': 'Organization' as const,
                '@id': organizationId,
                name: input.name,
                url: site,
            },
        },
        organization: {
            '@context': 'https://schema.org',
            '@type': 'Organization' as const,
            '@id': organizationId,
            name: input.name,
            url: site,
            description: input.description,
            brand,
            founder: {
                '@id': personId,
            },
            ...(input.image ? { logo: input.image } : {}),
        },
        person: {
            '@context': 'https://schema.org',
            '@type': 'Person' as const,
            '@id': personId,
            name: input.name,
            jobTitle: input.jobTitle,
            description: input.description,
            url: site,
            sameAs: [...input.sameAs],
            brand,
            worksFor: {
                '@type': 'Organization' as const,
                '@id': organizationId,
                name: input.name,
                url: site,
            },
            ...(input.image ? { image: input.image } : {}),
            mainEntityOfPage: {
                '@type': 'WebPage' as const,
                '@id': site,
            },
        },
    };
}

export function getBlogReference() {
    return {
        '@type': 'Blog' as const,
        name: `Blog - ${content.authorName}`,
        url: `${environment.url}/blog/`,
    };
}
