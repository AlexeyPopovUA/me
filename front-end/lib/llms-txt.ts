import { content } from '@/app/configuration/content';
import { environment } from '@/app/configuration/environment';
import { getResumeMarkdownPath } from '@/lib/markdown-paths';
import { ensurePathSlash } from '@/lib/utils';

type LlmsContentItem = {
  title: string;
  slug: string;
  description: string;
};

function toAbsolutePageUrl(path: string) {
  return `${environment.url}${ensurePathSlash(path)}`;
}

function toAbsoluteAssetUrl(path: string) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${environment.url}${normalized}`;
}

function formatLinkList(items: LlmsContentItem[], basePath: '/blog' | '/portfolio') {
  return items
    .map((item) => {
      const pageUrl = toAbsolutePageUrl(`${basePath}/${item.slug}`);
      const markdownUrl = `${pageUrl}index.md`;
      return `- [${item.title}](${pageUrl}) ([markdown](${markdownUrl})): ${item.description}`;
    })
    .join('\n');
}

export function buildLlmsTxt({
  articles,
  projects,
}: {
  articles: LlmsContentItem[];
  projects: LlmsContentItem[];
}) {
  const summary =
    'Front-end-leaning full-stack software developer with 14+ years of experience. Blog and portfolio covering React, TypeScript, Node.js, AWS, CI/CD, and static hosting.';

  return [
    `# ${content.authorName}`,
    '',
    `> ${summary}`,
    '',
    '## Key pages',
    '',
    `- [Home](${toAbsolutePageUrl('/')}): Portfolio site and latest work`,
    `- [Resume](${toAbsolutePageUrl('/resume')}) ([markdown](${toAbsoluteAssetUrl(getResumeMarkdownPath())})): Work history, skills, and experience`,
    `- [Blog](${toAbsolutePageUrl('/blog')}): Technical articles`,
    `- [Portfolio](${toAbsolutePageUrl('/portfolio')}): Selected projects`,
    `- [Contact](${toAbsolutePageUrl('/contact')}): Ways to get in touch`,
    `- [Full content bundle](${toAbsoluteAssetUrl('/llms-full.txt')}): All articles, projects, and resume in one file`,
    '',
    '## Articles',
    '',
    formatLinkList(articles, '/blog'),
    '',
    '## Portfolio',
    '',
    formatLinkList(projects, '/portfolio'),
    '',
  ].join('\n');
}

export function buildLlmsFullTxt(documents: string[]) {
  return documents.join('\n\n---\n\n');
}
