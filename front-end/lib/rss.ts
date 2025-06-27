import { getAllArticles } from './articles';
import { Feed } from 'feed';
import { environment } from '@/app/configuration/environment';

export async function generateRSSFeed() {
    const articles = await getAllArticles();

    const feed = new Feed({
        title: 'Oleksii Popov\'s Blog',
        description: 'Stay updated with the latest articles and insights from Oleksii Popov\'s blog.',
        author: {
            name: 'Oleksii Popov',
            email: 'opportunities@oleksiipopov.com',
            link: 'https://oleksiipopov.com',
        },
        favicon: `${environment.url}/favicon.ico`,
        id: environment.url,
        link: environment.url,
        language: 'en',
        copyright: `All rights reserved ${new Date().getFullYear()}`
    });

    articles.forEach((article) => {
        feed.addItem({
            title: article.title,
            id: `${environment.url}/blog/${article.slug}`,
            link: `${environment.url}/blog/${article.slug}`,
            description: article.description,
            date: new Date(article.date)
        });
    });

    return feed.rss2();
}

/**
 * Returns an object with the RSS HTML metadata for the feed autodetection
 */
export function getRssMetadataObject() {
    return {
        'application/rss+xml': '/api/rss.xml'
    } as const;
}
