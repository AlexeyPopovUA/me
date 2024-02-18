import {MetadataRoute} from 'next'

import {
    getAllArticleSitemapData,
    getAllProjectSitemapData,
} from "@/lib/articles";
import environment from "@/app/configuration/environment";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const allArticlesPromise = getAllArticleSitemapData();
    const allProjectsPromise = getAllProjectSitemapData();

    const [allArticles, allProjects] = await Promise.all([allArticlesPromise, allProjectsPromise]);
    const allPages: MetadataRoute.Sitemap = [
        "",
        "contact",
        "blog",
        "portfolio",
        "resume"
    ].map(page => ({url: `${environment.url}/${page}`, lastModified: new Date(), priority: 0.7, changeFrequency: "monthly"}));

    return [
        ...allPages,
        ...allArticles,
        ...allProjects
    ]
}
