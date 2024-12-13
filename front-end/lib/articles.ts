import {MetadataRoute} from "next";

import {
    getArticlePathByDirName,
    getArticlesBasePath,
    getProjectPathByDirName,
    getProjectsBasePath,
    listDirNames,
    readFrontMatterWithContent
} from "@/lib/files";
import {environment} from "@/app/configuration/environment";
import {ArticlesSchema} from "@/content/articles/articles-schema";
import {ProjectsSchema} from "@/content/projects/projects-schema";
import {getOGImageURL} from "@/lib/image";
import {CommonPostSchema} from "@/lib/posts";
import {ensurePathSlash} from "@/lib/utils";

const reverseTimeSorter = <T extends CommonPostSchema>(a: T, b: T) => new Date(b.date).getTime() - new Date(a.date).getTime();

export async function getArticleSEOContent({slug}: { slug: string }) {
    const matterResult = await readFrontMatterWithContent<ArticlesSchema>(getArticlePathByDirName(slug));

    return {
        ...matterResult.frontMatter,
        slug
    }
}

export async function getProjectSEOContent({slug}: { slug: string }) {
    return await readFrontMatterWithContent<ProjectsSchema>(getProjectPathByDirName(slug));
}

export async function getProjectData({slug}: { slug: string }) {
    return await readFrontMatterWithContent<ProjectsSchema>(getProjectPathByDirName(slug))
}

export async function getArticlesSlugs() {
    const dirs = await listDirNames(getArticlesBasePath());

    // read frontmatter data from all article files
    const frontMatterList = await Promise.all(dirs
        .map(dir => readFrontMatterWithContent<ArticlesSchema>(getArticlePathByDirName(dir))));

    return frontMatterList
        .filter(({frontMatter}) => !frontMatter.draft)
        .map(({frontMatter}) => frontMatter.slug);
}

export async function getProjectSlugs() {
    const dirs = await listDirNames(getProjectsBasePath());

    // read frontmatter data from all article files
    const frontMatterList = await Promise.all(dirs
        .map(dir => readFrontMatterWithContent<ProjectsSchema>(getProjectPathByDirName(dir))));

    return frontMatterList
        .filter(({frontMatter}) => !frontMatter.draft)
        .map(({frontMatter}) => frontMatter.slug);
}

export async function getLastArticles(cfg?: { limit?: number }) {
    const articleDirs = await listDirNames(getArticlesBasePath());

    // read frontmatter data from all article files
    const frontMatterList = await Promise.all(articleDirs
        .map(dir => readFrontMatterWithContent<ArticlesSchema>(getArticlePathByDirName(dir))));

    // filter out drafts
    let result = frontMatterList.filter(({frontMatter}) => !frontMatter.draft).map(({frontMatter}) => frontMatter);

    // sort by date
    result.sort(reverseTimeSorter);

    // take first N
    if (cfg && cfg.limit && cfg.limit > 0) {
        result = result.slice(0, cfg.limit);
    }

    return result;
}

export async function getAllArticles() {
    const postDirs = await listDirNames(getArticlesBasePath());

    // read frontmatter data from all article files
    const frontMatterList = await Promise.all(postDirs
        .map(dir => readFrontMatterWithContent<ArticlesSchema>(getArticlePathByDirName(dir))));

    // filter out drafts
    const result = frontMatterList
        .filter(({frontMatter}) => !frontMatter.draft)
        .map(({frontMatter}) => frontMatter);

    // sort by date
    result.sort(reverseTimeSorter);

    return result;
}

export async function getAllArticleSitemapData(): Promise<MetadataRoute.Sitemap> {
    const postDirs = await listDirNames(getArticlesBasePath());

    // read frontmatter data from all article files
    const frontMatterList = await Promise.all(postDirs
        .map(dir => readFrontMatterWithContent<ArticlesSchema>(getArticlePathByDirName(dir))));

    // filter out drafts
    const result = frontMatterList
        .filter(({frontMatter}) => !frontMatter.draft)
        .map(({frontMatter}) => frontMatter);

    // sort by date
    result.sort(reverseTimeSorter);

    return result.map(item => {
        const ogImage = getOGImageURL({src: item.thumbnail});

        return ({
            url: ensurePathSlash(`${environment.url}/blog/${item.slug}`),
            lastModified: new Date(),
            priority: 0.7,
            changeFrequency: "weekly",
            images: item.thumbnail ? [ogImage] : []
        });
    });
}

export async function getAllProjects() {
    const postDirs = await listDirNames(getProjectsBasePath());

    // read frontmatter data from all project files
    const frontMatterList = await Promise.all(postDirs
        .map(dir => readFrontMatterWithContent<ProjectsSchema>(getProjectPathByDirName(dir))));

    // filter out drafts
    const result = frontMatterList
        .filter(({frontMatter}) => !frontMatter.draft)
        .map(({frontMatter}) => frontMatter);

    // sort by date
    result.sort(reverseTimeSorter);

    return result;
}

export async function getAllProjectSitemapData(): Promise<MetadataRoute.Sitemap> {
    const postDirs = await listDirNames(getProjectsBasePath());

    // read frontmatter data from all project files
    const frontMatterList = await Promise.all(postDirs
        .map(dir => readFrontMatterWithContent<ArticlesSchema>(getProjectPathByDirName(dir))));

    // filter out drafts
    const result = frontMatterList.filter(({frontMatter}) => !frontMatter.draft)
        .map(({frontMatter}) => frontMatter);

    // sort by date
    result.sort(reverseTimeSorter);

    return result.map(item => {
        const ogImage = getOGImageURL({src: item.thumbnail});

        return ({
            url: ensurePathSlash(`${environment.url}/portfolio/${item.slug}`),
            lastModified: new Date(),
            priority: 0.5,
            changeFrequency: "monthly",
            images: item.thumbnail ? [ogImage] : []
        });
    });
}