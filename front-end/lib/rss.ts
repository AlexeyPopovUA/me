import { Feed } from 'feed';

import { environment } from '@/app/configuration/environment';
import { listPublishedArticles } from '@/lib/content-iteration';
import { getOGImageURL } from '@/lib/image';
import { buildMarkdownDocument } from '@/lib/markdown-export';
import { ensurePathSlash } from '@/lib/utils';
import type { ArticlesSchema } from '@/content/articles/articles-schema';

const reverseTimeSorter = (a: ArticlesSchema, b: ArticlesSchema) =>
  new Date(b.lastMod || b.date).getTime() - new Date(a.lastMod || a.date).getTime();

export async function generateRSSFeed() {
  const publishedArticles = (await listPublishedArticles())
    .filter((item) => !item.frontmatter.draft)
    .sort((a, b) => reverseTimeSorter(a.frontmatter, b.frontmatter));
  const feedUrl = `${environment.url}/api/rss.xml`;

  const feed = new Feed({
    title: "Oleksii Popov's Blog",
    description:
      "Stay updated with the latest articles and insights from Oleksii Popov's blog.",
    author: {
      name: 'Oleksii Popov',
      email: 'opportunities@oleksiipopov.com',
      link: 'https://oleksiipopov.com',
    },
    favicon: `${environment.url}/favicon.ico`,
    id: environment.url,
    link: environment.url,
    language: 'en',
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss: feedUrl,
    },
    updated: publishedArticles[0]
      ? new Date(
          publishedArticles[0].frontmatter.lastMod || publishedArticles[0].frontmatter.date
        )
      : new Date(),
  });

  for (const { frontmatter: article, body } of publishedArticles) {
    const articleUrl = `${environment.url}${ensurePathSlash(`/blog/${article.slug}`)}`;
    const imageUrl = getOGImageURL({ src: article.thumbnail });
    const markdownContent = buildMarkdownDocument({
      frontmatter: article,
      body,
      siteUrl: environment.url,
      canonicalUrl: articleUrl,
    });

    feed.addItem({
      title: article.title,
      id: articleUrl,
      link: articleUrl,
      description: article.description,
      content: markdownContent,
      date: new Date(article.lastMod || article.date),
      enclosure: {
        url: imageUrl,
        type: 'image/jpeg',
      },
    });
  }

  return feed.rss2();
}

/**
 * Returns an object with the RSS HTML metadata for the feed autodetection
 */
export function getRssMetadataObject() {
  return {
    'application/rss+xml': '/api/rss.xml',
  } as const;
}
