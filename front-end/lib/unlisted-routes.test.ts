import fs from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

const root = process.cwd();
const robotsPath = path.join(root, 'public', 'robots.txt');
const sitemapPath = path.join(root, 'app', 'sitemap.ts');
const resumeOlenaPagePath = path.join(root, 'app', 'resume-olena', 'page.tsx');

describe('unlisted resume routes', () => {
  it('disallows private resume paths in robots.txt', () => {
    const robots = fs.readFileSync(robotsPath, 'utf8');

    expect(robots).toContain('Disallow: /resume-print/');
    expect(robots).toContain('Disallow: /resume-olena/');
  });

  it('keeps resume-olena out of the sitemap static page list', () => {
    const sitemap = fs.readFileSync(sitemapPath, 'utf8');

    expect(sitemap).not.toContain('resume-olena');
  });

  it('marks resume-olena as noindex in page metadata', () => {
    const page = fs.readFileSync(resumeOlenaPagePath, 'utf8');

    expect(page).toMatch(/index:\s*false/);
    expect(page).not.toContain('ResumeStructuredData');
  });
});