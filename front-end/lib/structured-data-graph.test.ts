import { describe, expect, it } from 'vitest';

import type { ContentImageRef } from '@/lib/content-images';
import {
  buildBlogPostStructuredDataGraph,
  buildProjectStructuredDataGraph,
} from '@/lib/structured-data-graph';

const imageRefs: ContentImageRef[] = [
  {
    src: '/articles/example/hero.png',
    alt: 'Example article hero image for structured data',
    anchorId: 'thumbnail',
    width: 1200,
    height: 675,
  },
  {
    src: '/articles/example/diagram.png',
    alt: 'Architecture diagram for the example article',
    caption: 'Architecture overview',
    anchorId: 'articles-example-diagram',
    width: 1024,
    height: 768,
  },
];

describe('structured data graph', () => {
  it('builds a linked blog posting graph with image list', () => {
    const graph = buildBlogPostStructuredDataGraph({
      title: 'Example Article',
      description: 'Example description',
      datePublished: '2026-01-01',
      dateModified: '2026-06-01',
      author: 'Oleksii Popov',
      url: 'https://oleksiipopov.com/blog/example/',
      siteUrl: 'https://oleksiipopov.com',
      imageRefs,
    });

    const nodes = graph['@graph'] as Array<Record<string, unknown>>;
    const webPage = nodes.find((node) => node['@type'] === 'WebPage');
    const blogPosting = nodes.find((node) => node['@type'] === 'BlogPosting');
    const imageList = nodes.find((node) => node['@type'] === 'ItemList');
    const imageNodes = nodes.filter((node) => node['@type'] === 'ImageObject');

    expect(webPage?.primaryImageOfPage).toEqual({
      '@id': 'https://oleksiipopov.com/blog/example/#thumbnail',
    });
    expect(webPage?.hasPart).toEqual({ '@id': 'https://oleksiipopov.com/blog/example/#images' });
    expect(blogPosting?.image).toEqual([
      { '@id': 'https://oleksiipopov.com/blog/example/#thumbnail' },
      { '@id': 'https://oleksiipopov.com/blog/example/#articles-example-diagram' },
    ]);
    expect(imageList).toMatchObject({
      numberOfItems: 2,
      itemListElement: [
        expect.objectContaining({
          position: 1,
          item: { '@id': 'https://oleksiipopov.com/blog/example/#thumbnail' },
        }),
        expect.objectContaining({
          position: 2,
          item: { '@id': 'https://oleksiipopov.com/blog/example/#articles-example-diagram' },
        }),
      ],
    });
    expect(imageNodes[0]).toMatchObject({
      representativeOfPage: true,
      width: 1200,
      height: 675,
    });
  });

  it('builds a linked project graph with breadcrumbs', () => {
    const graph = buildProjectStructuredDataGraph({
      name: 'Example Project',
      description: 'Example project description',
      url: 'https://oleksiipopov.com/portfolio/example/',
      siteUrl: 'https://oleksiipopov.com',
      authorName: 'Oleksii Popov',
      authorUrl: 'https://oleksiipopov.com',
      datePublished: '2025-01-01',
      technologies: ['Next.js', 'TypeScript'],
      imageRefs: [imageRefs[0]],
    });

    const nodes = graph['@graph'] as Array<Record<string, unknown>>;
    const webApplication = nodes.find((node) => node['@type'] === 'WebApplication');
    const breadcrumb = nodes.find((node) => node['@type'] === 'BreadcrumbList');

    expect(webApplication?.keywords).toBe('Next.js, TypeScript');
    expect(breadcrumb).toMatchObject({
      itemListElement: [
        expect.objectContaining({ name: 'Home' }),
        expect.objectContaining({ name: 'Portfolio' }),
        expect.objectContaining({ name: 'Example Project' }),
      ],
    });
    expect(nodes.some((node) => node['@type'] === 'ItemList')).toBe(false);
  });
});
