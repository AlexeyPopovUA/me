import matter from 'gray-matter';

export function resolveRelativeUrlsInMarkdown(markdown: string, siteUrl: string): string {
  const base = siteUrl.replace(/\/$/, '');

  return markdown
    .replace(/(!\[[^\]]*]\()\/([^)]+)\)/g, `$1${base}/$2)`)
    .replace(/(\[[^\]]+]\()\/([^)]+)\)/g, `$1${base}/$2)`);
}

/** Rewrites root-relative asset paths (e.g. `thumbnail`, `gallery`) to absolute URLs. */
export function absolutizeFrontmatterPaths<T extends object>(frontmatter: T, siteUrl: string): T {
  const base = siteUrl.replace(/\/$/, '');
  const absolutize = (value: unknown): unknown => {
    if (typeof value === 'string' && value.startsWith('/')) {
      return `${base}${value}`;
    }
    if (Array.isArray(value)) {
      return value.map(absolutize);
    }
    return value;
  };

  return Object.fromEntries(
    Object.entries(frontmatter).map(([key, value]) => [key, absolutize(value)])
  ) as T;
}

export function buildMarkdownDocument({
  frontmatter,
  body,
  siteUrl,
  canonicalUrl,
}: {
  frontmatter: object;
  body: string;
  siteUrl: string;
  canonicalUrl: string;
}) {
  const resolvedBody = resolveRelativeUrlsInMarkdown(body, siteUrl);
  const exportFrontmatter = {
    ...absolutizeFrontmatterPaths(frontmatter, siteUrl),
    canonical_url: canonicalUrl,
    markdown_url: `${canonicalUrl.replace(/\/$/, '')}/index.md`,
  };

  return matter.stringify(resolvedBody, exportFrontmatter);
}
