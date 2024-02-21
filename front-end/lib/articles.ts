import {MetadataRoute} from "next";

import {
    getArticlePathByDirName,
    getArticlesBasePath,
    getPagePathByDirName,
    getProjectPathByDirName,
    getProjectsBasePath,
    listDirNames,
    readFrontMatter,
    readFrontMatterWithContent
} from "@/lib/files";
import {ArticlesSchema} from "@/content/articles/articles-schema";
import {ProjectsSchema} from "@/content/projects/projects-schema";
import {CommonPostSchema} from "@/lib/posts";
import {ensurePathSlash} from "@/lib/utils";
import environment from "@/app/configuration/environment";

const reverseTimeSorter = <T extends CommonPostSchema>(a: T, b: T) => b.date.getTime() - a.date.getTime();

export async function getArticleSEOContent({slug}: { slug: string }) {
    const matterResult = await readFrontMatterWithContent<ArticlesSchema>(getArticlePathByDirName(slug));

    return {
        ...matterResult.frontMatter,
        slug
    }
}

export async function getProjectSEOContent({slug}: { slug: string }) {
    return await readFrontMatter<ProjectsSchema>(getProjectPathByDirName(slug));
}

export async function getFullArticleContent({slug}: { slug: string }) {
    const matterResult = await readFrontMatterWithContent<ArticlesSchema>(getArticlePathByDirName(slug));

    return {
        ...matterResult.frontMatter,
        content: matterResult.content,
        slug
    }
}

export async function getProjectData({slug}: { slug: string }) {
    return await readFrontMatter<ProjectsSchema>(getProjectPathByDirName(slug))
}

export async function getFullPageContent({slug}: { slug: string }) {
    const matterResult = await readFrontMatterWithContent<ArticlesSchema>(getPagePathByDirName(slug));

    return {
        ...matterResult.frontMatter,
        content: matterResult.content,
        slug
    }
}

export async function getArticlesSlugs() {
    const articleDirs = await listDirNames(getArticlesBasePath());

    // read frontmatter data from all article files
    const frontMatterList = await Promise.all(articleDirs
        .map(dir => readFrontMatter<ArticlesSchema>(getArticlePathByDirName(dir))));

    // filter out drafts
    const publicArtilesSlugs = frontMatterList.filter(fm => !fm.draft);

    // read real slug values from the frontmatter
    return publicArtilesSlugs.map(fm => fm.slug);
}

export async function getProjectSlugs() {
    const dirs = await listDirNames(getProjectsBasePath());

    // read frontmatter data from all article files
    const frontMatterList = await Promise.all(dirs
        .map(dir => readFrontMatter<ProjectsSchema>(getProjectPathByDirName(dir))));

    // filter out drafts
    const publicProjectSlugs = frontMatterList.filter(fm => !fm.draft);

    // read real slug values from the frontmatter
    return publicProjectSlugs.map(fm => fm.slug);
}

export async function getLastArticles(cfg?: { limit?: number }) {
    const articleDirs = await listDirNames(getArticlesBasePath());

    // read frontmatter data from all article files
    const frontMatterList = await Promise.all(articleDirs
        .map(dir => readFrontMatter<ArticlesSchema>(getArticlePathByDirName(dir))));

    // filter out drafts
    let result = frontMatterList.filter(fm => !fm.draft);

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
        .map(dir => readFrontMatter<ArticlesSchema>(getArticlePathByDirName(dir))));

    // filter out drafts
    let result = frontMatterList.filter(fm => !fm.draft);

    // sort by date
    result.sort(reverseTimeSorter);

    return result;
}

export async function getAllArticleSitemapData(): Promise<MetadataRoute.Sitemap> {
    const postDirs = await listDirNames(getArticlesBasePath());

    // read frontmatter data from all article files
    const frontMatterList = await Promise.all(postDirs
        .map(dir => readFrontMatter<ArticlesSchema>(getArticlePathByDirName(dir))));

    // filter out drafts
    let result = frontMatterList.filter(fm => !fm.draft);

    // sort by date
    result.sort(reverseTimeSorter);

    return result.map(item => ({url: ensurePathSlash(`${environment.url}/blog/${item.slug}`), lastModified: new Date(), priority: 0.7, changeFrequency: "weekly"}));
}

export async function getAllProjects() {
    const postDirs = await listDirNames(getProjectsBasePath());

    // read frontmatter data from all project files
    const frontMatterList = await Promise.all(postDirs
        .map(dir => readFrontMatter<ProjectsSchema>(getProjectPathByDirName(dir))));

    // filter out drafts
    let result = frontMatterList.filter(fm => !fm.draft);

    // sort by date
    result.sort(reverseTimeSorter);

    return result;
}

export async function getAllProjectSitemapData(): Promise<MetadataRoute.Sitemap> {
    const postDirs = await listDirNames(getProjectsBasePath());

    // read frontmatter data from all project files
    const frontMatterList = await Promise.all(postDirs
        .map(dir => readFrontMatter<ArticlesSchema>(getProjectPathByDirName(dir))));

    // filter out drafts
    let result = frontMatterList.filter(fm => !fm.draft);

    // sort by date
    result.sort(reverseTimeSorter);

    return result.map(item => ({url: ensurePathSlash(`${environment.url}/portfolio/${item.slug}`), lastModified: new Date(), priority: 0.5, changeFrequency: "monthly"}));
}