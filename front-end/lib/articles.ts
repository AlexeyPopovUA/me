import {remark} from 'remark';
import html from 'remark-html';
import emoji from 'remark-emoji';
import {
    getArticlePathByDirName,
    getArticlesBasePath,
    getPagePathByDirName,
    listDirNames, readFrontMatter,
    readFrontMatterWithContent
} from "@/lib/files";
import {ArticlesSchema} from "@/content/articles/articles-schema";

export async function getFullArticleContent({slug}: { slug: string }) {
    const matterResult = await readFrontMatterWithContent<ArticlesSchema>(getArticlePathByDirName(slug));

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        // @ts-ignore
        .use(emoji, { accessible: true, emoticon: true })
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        ...matterResult.frontMatter,
        contentHtml,
        slug
    }
}

export async function getFullPageContent({slug}: { slug: string }) {
    const matterResult = await readFrontMatterWithContent<ArticlesSchema>(getPagePathByDirName(slug));

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        // @ts-ignore
        .use(emoji, { accessible: true, emoticon: true })
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        ...matterResult.frontMatter,
        contentHtml,
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

    if (cfg && cfg.limit && cfg.limit > 0) {
        result = result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, cfg.limit);
    }

    return result;
}
