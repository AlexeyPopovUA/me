import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from 'remark';
import html from 'remark-html';


export const baseArticleDir = "articles";
export const baseArticleFileName = "article.mdx";

export async function getPost({slug}: { slug: string }) {
    const markdownFile = await fs.readFile(path.resolve(path.join(baseArticleDir, slug, baseArticleFileName)), 'utf-8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(markdownFile);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        slug,
        contentHtml,
        ...matterResult.data
    }
}

export async function getArticlesSlugList () {
    const articleDirents = await fs.readdir(path.join(baseArticleDir), {withFileTypes: true, recursive: false});

    // TODO Check article draft status, maybe
    return articleDirents
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
}
