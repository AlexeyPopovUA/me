import {
    getArticlePathByDirName,
    getArticlesBasePath,
    getPagePathByDirName,
    listDirNames, readFrontMatter,
    readFrontMatterWithContent
} from "@/lib/files";
import {ArticlesSchema} from "@/content/articles/articles-schema";

export async function getArticleSEOContent({slug}: { slug: string }) {
    const matterResult = await readFrontMatterWithContent<ArticlesSchema>(getArticlePathByDirName(slug));

    return {
        ...matterResult.frontMatter,
        slug
    }
}

export async function getFullArticleContent({slug}: { slug: string }) {
    const matterResult = await readFrontMatterWithContent<ArticlesSchema>(getArticlePathByDirName(slug));

    return {
        ...matterResult.frontMatter,
        content: matterResult.content,
        slug
    }
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
    const result = publicArtilesSlugs.map(fm => fm.slug);

    return result;
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

export async function getAllArticles(cfg?: {  }) {
    const articleDirs = await listDirNames(getArticlesBasePath());

    // read frontmatter data from all article files
    const frontMatterList = await Promise.all(articleDirs
        .map(dir => readFrontMatter<ArticlesSchema>(getArticlePathByDirName(dir))));

    // filter out drafts
    let result = frontMatterList.filter(fm => !fm.draft);

    // sort by date
    result = result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return result;
}
