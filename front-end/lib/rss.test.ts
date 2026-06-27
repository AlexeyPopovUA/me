import { describe, expect, it } from 'vitest';

import { generateRSSFeed } from '@/lib/rss';

describe('generateRSSFeed', () => {
  it('returns valid rss with enclosures and full article content', async () => {
    const rss = await generateRSSFeed();

    expect(rss).toContain('<rss version="2.0"');
    expect(rss).toContain('<content:encoded>');
    expect(rss).toContain('<enclosure');
    expect(rss).toContain('type="image/jpeg"');
    expect(rss).not.toContain('type="image//');
    expect((rss.match(/<item>/g) ?? []).length).toBe(9);
    expect(rss).toContain('canonical_url:');
    expect(rss.length).toBeGreaterThan(20_000);
  });

  it('excludes draft articles even when draft preview is enabled', async () => {
    const previousNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    try {
      const rss = await generateRSSFeed();
      expect((rss.match(/<item>/g) ?? []).length).toBe(9);
      expect(rss).not.toContain('mermaid-diagrams-in-nextjs');
    } finally {
      process.env.NODE_ENV = previousNodeEnv;
    }
  });
});
