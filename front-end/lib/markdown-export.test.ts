import { describe, expect, it } from 'vitest';

import { buildMarkdownDocument, resolveRelativeUrlsInMarkdown } from '@/lib/markdown-export';

describe('markdown export', () => {
  it('resolves root-relative image and link paths to absolute URLs', () => {
    const markdown = [
      '![Hero](/articles/example/hero.png)',
      '[Read more](/blog/example/)',
    ].join('\n');

    expect(resolveRelativeUrlsInMarkdown(markdown, 'https://oleksiipopov.com')).toBe(
      [
        '![Hero](https://oleksiipopov.com/articles/example/hero.png)',
        '[Read more](https://oleksiipopov.com/blog/example/)',
      ].join('\n')
    );
  });

  it('adds canonical and markdown URLs to exported frontmatter', () => {
    const markdown = buildMarkdownDocument({
      frontmatter: {
        title: 'Example',
        slug: 'example',
        date: '2026-01-01',
        description: 'Example description',
      },
      body: '# Hello',
      siteUrl: 'https://oleksiipopov.com',
      canonicalUrl: 'https://oleksiipopov.com/blog/example/',
    });

    expect(markdown).toContain("canonical_url: 'https://oleksiipopov.com/blog/example/'");
    expect(markdown).toContain("markdown_url: 'https://oleksiipopov.com/blog/example/index.md'");
    expect(markdown).toContain('# Hello');
  });

  it('absolutizes root-relative asset paths in frontmatter', () => {
    const markdown = buildMarkdownDocument({
      frontmatter: {
        title: 'Example',
        thumbnail: '/articles/example/hero.png',
        gallery: ['/articles/example/1.png', '/articles/example/2.png'],
        keywords: ['not-a-path'],
      },
      body: '# Hello',
      siteUrl: 'https://oleksiipopov.com',
      canonicalUrl: 'https://oleksiipopov.com/blog/example/',
    });

    expect(markdown).toContain("thumbnail: 'https://oleksiipopov.com/articles/example/hero.png'");
    expect(markdown).toContain('https://oleksiipopov.com/articles/example/1.png');
    expect(markdown).toContain('- not-a-path');
  });
});
