import { ensurePathSlash } from '@/lib/utils';

export function getContentMarkdownPath(contentPath: string) {
  return `${ensurePathSlash(contentPath)}index.md`;
}

export function getBlogMarkdownPath(slug: string) {
  return getContentMarkdownPath(`/blog/${slug}`);
}

export function getPortfolioMarkdownPath(slug: string) {
  return getContentMarkdownPath(`/portfolio/${slug}`);
}

export function getResumeMarkdownPath() {
  return getContentMarkdownPath('/resume');
}
