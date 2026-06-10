import type { ArticlesSchema } from '@/content/articles/articles-schema';
import type { ProjectsSchema } from '@/content/projects/projects-schema';
import {
  getArticlePathByDirName,
  getArticlesBasePath,
  getProjectPathByDirName,
  getProjectsBasePath,
  listDirNames,
} from '@/lib/files';
import { isDraftPreviewEnabled } from '@/lib/content-draft';
import { getFrontMatterDataByPath } from '@/lib/mdx-frontmatter';
import { readMdxBodyByPath } from '@/lib/mdx-source';

export type PublishedArticle = {
  path: string;
  frontmatter: ArticlesSchema;
  body: string;
};

export type PublishedProject = {
  path: string;
  frontmatter: ProjectsSchema;
  body: string;
};

export async function listPublishedArticles(): Promise<PublishedArticle[]> {
  const dirs = await listDirNames(getArticlesBasePath());
  const items: PublishedArticle[] = [];

  for (const dir of dirs) {
    const path = getArticlePathByDirName(dir);
    const frontmatter = await getFrontMatterDataByPath<ArticlesSchema>(path);
    if (!isDraftPreviewEnabled() && frontmatter.draft) {
      continue;
    }

    const body = await readMdxBodyByPath(path);
    items.push({ path, frontmatter, body });
  }

  return items;
}

export async function listPublishedProjects(): Promise<PublishedProject[]> {
  const dirs = await listDirNames(getProjectsBasePath());
  const items: PublishedProject[] = [];

  for (const dir of dirs) {
    const path = getProjectPathByDirName(dir);
    const frontmatter = await getFrontMatterDataByPath<ProjectsSchema>(path);
    if (frontmatter.draft) {
      continue;
    }

    const body = await readMdxBodyByPath(path);
    items.push({ path, frontmatter, body });
  }

  return items;
}
