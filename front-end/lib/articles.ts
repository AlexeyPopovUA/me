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
    result = result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
    result = result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return result;
}

export async function getAllProjects() {
    const postDirs = await listDirNames(getProjectsBasePath());

    // read frontmatter data from all article files
    const frontMatterList = await Promise.all(postDirs
        .map(dir => readFrontMatter<ProjectsSchema>(getProjectPathByDirName(dir))));

    // filter out drafts
    let result = frontMatterList.filter(fm => !fm.draft);

    // sort by date
    result = result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return result;
}