import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export const baseArticleDir = "content/articles";
export const baseProjectDir = "content/projects";
export const basePageDir = "content/pages";
export const baseArticleFileName = "article.mdx";
export const basePageFileName = "article.mdx";

export const listDirNames = async (basePath: string) => {
    const articleDirents = await fs.readdir(basePath, {withFileTypes: true, recursive: false});

    return articleDirents
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
}

export const readFrontMatter = async <T extends { [p: string]: any }>(articlePath: string) => {
    const content = await fs.readFile(articlePath);
    const {data: frontMatter} = matter(content, {excerpt: false});

    return frontMatter as T;
}

export const readFrontMatterWithContent = async <T extends { [p: string]: any }>(articlePath: string) => {
    const file = await fs.readFile(articlePath);
    const {data: frontMatter, content} = matter(file, {excerpt: false});

    return {frontMatter: frontMatter as T, content};
}

export const getArticlePathByDirName = (dirName: string) => path.resolve(path.join(baseArticleDir, dirName, baseArticleFileName));
export const getProjectPathByDirName = (dirName: string) => path.resolve(path.join(baseProjectDir, dirName, baseArticleFileName));

export const getPagePathByDirName = (slug: string) => path.resolve(path.join(basePageDir, slug, basePageFileName));
export const getPagesBasePath = () => path.resolve(basePageDir);
export const getArticlesBasePath = () => path.resolve(baseArticleDir);
export const getProjectsBasePath = () => path.resolve(baseProjectDir);
