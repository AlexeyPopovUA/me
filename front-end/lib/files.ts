import fs from "node:fs/promises";
import path from "node:path";

import {getMdxDataByPath} from "@/lib/mdx-utils";

export const baseArticleDir = "content/articles";
export const baseProjectDir = "content/projects";
export const basePageDir = "content/pages";
export const baseArticleFileName = "article.mdx";
export const baseProjectFileName = "article.mdx";
export const basePageFileName = "article.mdx";

export const listDirNames = async (basePath: string) => {
    const dirents = await fs.readdir(basePath, {withFileTypes: true, recursive: false});

    return dirents
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
}

// @ts-expect-error - todo > add proper types later
export const readFrontMatterWithContent = async <T extends Record<string, string | Date | Array>>(articlePath: string) => {
    const data = await getMdxDataByPath({path: articlePath});

    return {frontMatter: data.frontmatter as T, content: data.content};
}

export const getArticlePathByDirName = (dirName: string) => path.resolve(path.join(baseArticleDir, dirName, baseArticleFileName));
export const getProjectPathByDirName = (dirName: string) => path.resolve(path.join(baseProjectDir, dirName, baseProjectFileName));

export const getPagePathByDirName = (slug: string) => path.resolve(path.join(basePageDir, slug, basePageFileName));
export const getArticlesBasePath = () => path.resolve(baseArticleDir);
export const getProjectsBasePath = () => path.resolve(baseProjectDir);
