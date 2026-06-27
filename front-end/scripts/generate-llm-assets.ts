import fs from 'node:fs/promises';
import path from 'node:path';

import { content } from '@/app/configuration/content';
import { environment } from '@/app/configuration/environment';
import { listPublishedArticles, listPublishedProjects } from '@/lib/content-iteration';
import { buildLlmsFullTxt, buildLlmsTxt } from '@/lib/llms-txt';
import { buildMarkdownDocument } from '@/lib/markdown-export';
import { buildResumeMarkdown } from '@/lib/resume-markdown';
import { ensurePathSlash } from '@/lib/utils';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

async function writeMarkdownAtPath(relativeDir: string, markdown: string) {
  const outputDir = path.join(PUBLIC_DIR, relativeDir);
  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(path.join(outputDir, 'index.md'), markdown, 'utf8');
}

// NOTE: removes whole `public/blog` and `public/portfolio` dirs. These hold only
// generated markdown today; do not place hand-authored static assets under them.
async function removeGeneratedAssets() {
  await Promise.all([
    fs.rm(path.join(PUBLIC_DIR, 'blog'), { recursive: true, force: true }),
    fs.rm(path.join(PUBLIC_DIR, 'portfolio'), { recursive: true, force: true }),
    fs.rm(path.join(PUBLIC_DIR, 'resume', 'index.md'), { force: true }),
    fs.rm(path.join(PUBLIC_DIR, 'llms.txt'), { force: true }),
    fs.rm(path.join(PUBLIC_DIR, 'llms-full.txt'), { force: true }),
  ]);
}

type GeneratableContent = {
  frontmatter: { slug: string };
  body: string;
};

async function generateContentMarkdown(
  items: GeneratableContent[],
  section: 'blog' | 'portfolio'
) {
  const documents: string[] = [];

  for (const { frontmatter, body } of items) {
    const canonicalUrl = `${environment.url}${ensurePathSlash(`/${section}/${frontmatter.slug}`)}`;
    const markdown = buildMarkdownDocument({
      frontmatter,
      body,
      siteUrl: environment.url,
      canonicalUrl,
    });

    await writeMarkdownAtPath(`${section}/${frontmatter.slug}`, markdown);
    documents.push(markdown);
  }

  return documents;
}

async function main() {
  await removeGeneratedAssets();

  const [articles, projects] = await Promise.all([listPublishedArticles(), listPublishedProjects()]);

  const articleDocuments = await generateContentMarkdown(articles, 'blog');
  const projectDocuments = await generateContentMarkdown(projects, 'portfolio');

  const resumeMarkdown = buildResumeMarkdown();
  await writeMarkdownAtPath('resume', resumeMarkdown);
  const fullTextDocuments = [resumeMarkdown, ...articleDocuments, ...projectDocuments];

  const llmsTxt = buildLlmsTxt({
    articles: articles.map(({ frontmatter }) => ({
      title: frontmatter.title,
      slug: frontmatter.slug,
      description: frontmatter.description,
    })),
    projects: projects.map(({ frontmatter }) => ({
      title: frontmatter.title,
      slug: frontmatter.slug,
      description: frontmatter.description,
    })),
  });

  const llmsFullTxt = buildLlmsFullTxt(fullTextDocuments);

  await Promise.all([
    fs.writeFile(path.join(PUBLIC_DIR, 'llms.txt'), llmsTxt, 'utf8'),
    fs.writeFile(path.join(PUBLIC_DIR, 'llms-full.txt'), llmsFullTxt, 'utf8'),
  ]);

  console.log(
    `Generated LLM assets for ${content.authorName}: ${articles.length} articles, ${projects.length} projects, resume, llms.txt, llms-full.txt`
  );
}

main().catch((error) => {
  console.error('Failed to generate LLM assets:', error);
  process.exit(1);
});
