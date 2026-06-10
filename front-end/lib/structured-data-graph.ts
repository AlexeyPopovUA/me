import type { ContentImageRef } from '@/lib/content-images';
import { getBlogReference, getPublisher } from '@/lib/structured-data';
import { getStructuredDataImageURL } from '@/lib/image';

type GraphNode = Record<string, unknown>;

function buildImageObjectNodes(
  pageUrl: string,
  imageRefs: ContentImageRef[],
  defaultName: string
) {
  return imageRefs.map((image, index) => {
    const imageUrl = getStructuredDataImageURL({
      src: image.src,
      width: image.width,
      height: image.height,
    });
    const imageId = `${pageUrl}#${image.anchorId}`;

    return {
      '@type': 'ImageObject' as const,
      '@id': imageId,
      url: imageUrl,
      contentUrl: imageUrl,
      width: image.width,
      height: image.height,
      name: image.alt || defaultName,
      ...(image.caption ? { caption: image.caption } : {}),
      ...(index === 0 ? { representativeOfPage: true } : {}),
    };
  });
}

function buildImageItemList(pageUrl: string, imageRefs: ContentImageRef[], name: string) {
  if (imageRefs.length < 2) {
    return null;
  }

  return {
    '@type': 'ItemList' as const,
    '@id': `${pageUrl}#images`,
    name,
    numberOfItems: imageRefs.length,
    itemListElement: imageRefs.map((image, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      name: image.alt || image.caption || `Image ${index + 1}`,
      url: `${pageUrl}#${image.anchorId}`,
      item: {
        '@id': `${pageUrl}#${image.anchorId}`,
      },
    })),
  };
}

function buildBreadcrumbList(
  pageUrl: string,
  breadcrumbId: string,
  sectionName: string,
  sectionUrl: string,
  pageName: string,
  siteUrl: string
) {
  const homeUrl = `${siteUrl.replace(/\/$/, '')}/`;

  return {
    '@type': 'BreadcrumbList' as const,
    '@id': breadcrumbId,
    itemListElement: [
      {
        '@type': 'ListItem' as const,
        position: 1,
        name: 'Home',
        item: homeUrl,
      },
      {
        '@type': 'ListItem' as const,
        position: 2,
        name: sectionName,
        item: sectionUrl,
      },
      {
        '@type': 'ListItem' as const,
        position: 3,
        name: pageName,
        item: pageUrl,
      },
    ],
  };
}

function buildWebPageNode({
  pageUrl,
  siteUrl,
  name,
  description,
  datePublished,
  dateModified,
  breadcrumbId,
  mainEntityId,
  primaryImageId,
  imageList,
}: {
  pageUrl: string;
  siteUrl: string;
  name: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  breadcrumbId: string;
  mainEntityId: string;
  primaryImageId: string;
  imageList: ReturnType<typeof buildImageItemList>;
}) {
  return {
    '@type': 'WebPage' as const,
    '@id': pageUrl,
    url: pageUrl,
    name,
    description,
    ...(datePublished ? { datePublished: new Date(datePublished).toISOString() } : {}),
    ...(dateModified ? { dateModified: new Date(dateModified).toISOString() } : {}),
    inLanguage: 'en',
    isPartOf: {
      '@id': `${siteUrl.replace(/\/$/, '')}/#website`,
    },
    primaryImageOfPage: {
      '@id': primaryImageId,
    },
    breadcrumb: {
      '@id': breadcrumbId,
    },
    mainEntity: {
      '@id': mainEntityId,
    },
    ...(imageList
      ? {
          hasPart: {
            '@id': imageList['@id'],
          },
        }
      : {}),
  };
}

export function buildBlogPostStructuredDataGraph({
  title,
  description,
  datePublished,
  dateModified,
  author,
  url,
  siteUrl,
  imageRefs,
}: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  url: string;
  siteUrl: string;
  imageRefs: ContentImageRef[];
}) {
  const imageNodes = buildImageObjectNodes(url, imageRefs, title);
  const primaryImageId = imageNodes[0]?.['@id'] ?? `${url}#${imageRefs[0]?.anchorId ?? 'thumbnail'}`;
  const blogPostingId = `${url}#blog-posting`;
  const breadcrumbId = `${url}#breadcrumb`;
  const imageList = buildImageItemList(url, imageRefs, 'Images in this article');
  const blogUrl = `${siteUrl.replace(/\/$/, '')}/blog/`;

  const graph: GraphNode[] = [
    buildWebPageNode({
      pageUrl: url,
      siteUrl,
      name: title,
      description,
      datePublished,
      dateModified,
      breadcrumbId,
      mainEntityId: blogPostingId,
      primaryImageId,
      imageList,
    }),
    {
      '@type': 'BlogPosting',
      '@id': blogPostingId,
      headline: title,
      description,
      datePublished: new Date(datePublished).toISOString(),
      ...(dateModified
        ? { dateModified: new Date(dateModified).toISOString() }
        : {}),
      inLanguage: 'en',
      image: imageNodes.map((image) => ({ '@id': image['@id'] })),
      ...(imageRefs[0]
        ? {
            thumbnailUrl: getStructuredDataImageURL({
              src: imageRefs[0].src,
              width: imageRefs[0].width,
              height: imageRefs[0].height,
            }),
          }
        : {}),
      url,
      author: {
        '@type': 'Person',
        name: author,
        url: siteUrl,
      },
      publisher: getPublisher(),
      isPartOf: getBlogReference(),
      articleSection: 'Blog',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
    },
    ...imageNodes,
    buildBreadcrumbList(url, breadcrumbId, 'Blog', blogUrl, title, siteUrl),
    ...(imageList ? [imageList] : []),
  ];

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export function buildProjectStructuredDataGraph({
  name,
  description,
  url,
  siteUrl,
  authorName,
  authorUrl,
  datePublished,
  sameAs,
  technologies,
  imageRefs,
}: {
  name: string;
  description: string;
  url: string;
  siteUrl: string;
  authorName: string;
  authorUrl: string;
  datePublished?: string;
  sameAs?: string[];
  technologies?: string[];
  imageRefs: ContentImageRef[];
}) {
  const imageNodes = buildImageObjectNodes(url, imageRefs, name);
  const primaryImageId = imageNodes[0]?.['@id'] ?? `${url}#${imageRefs[0]?.anchorId ?? 'thumbnail'}`;
  const webApplicationId = `${url}#web-application`;
  const breadcrumbId = `${url}#breadcrumb`;
  const imageList = buildImageItemList(url, imageRefs, 'Screenshots in this project');
  const portfolioUrl = `${siteUrl.replace(/\/$/, '')}/portfolio/`;

  const graph: GraphNode[] = [
    buildWebPageNode({
      pageUrl: url,
      siteUrl,
      name,
      description,
      datePublished,
      breadcrumbId,
      mainEntityId: webApplicationId,
      primaryImageId,
      imageList,
    }),
    {
      '@type': 'WebApplication',
      '@id': webApplicationId,
      name,
      description,
      url,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web browser',
      browserRequirements: 'Requires a modern web browser with JavaScript enabled',
      author: {
        '@type': 'Person',
        name: authorName,
        url: authorUrl,
      },
      creator: getPublisher(),
      image: imageNodes.map((image) => ({ '@id': image['@id'] })),
      thumbnailUrl: imageRefs[0]
        ? getStructuredDataImageURL({
            src: imageRefs[0].src,
            width: imageRefs[0].width,
            height: imageRefs[0].height,
          })
        : undefined,
      ...(datePublished
        ? { datePublished: new Date(datePublished).toISOString() }
        : {}),
      ...(sameAs && sameAs.length > 0 ? { sameAs } : {}),
      ...(technologies && technologies.length > 0
        ? { keywords: technologies.join(', ') }
        : {}),
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
    },
    ...imageNodes,
    buildBreadcrumbList(url, breadcrumbId, 'Portfolio', portfolioUrl, name, siteUrl),
    ...(imageList ? [imageList] : []),
  ];

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
