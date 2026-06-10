import { describe, expect, it } from 'vitest';

import { listPublishedArticles, listPublishedProjects } from '@/lib/content-iteration';
import { extractArticleImageRefs, extractProjectImageRefs } from '@/lib/content-images';
import {
  validateArticleImageAccessibility,
  validateProjectImageAccessibility,
} from '@/lib/content-alt-text';
import manifest from '@/lib/image-manifest.json';

describe('published content quality', () => {
  it('uses descriptive alt text across published articles', async () => {
    const issues: string[] = [];

    for (const { frontmatter, body } of await listPublishedArticles()) {
      issues.push(
        ...validateArticleImageAccessibility(frontmatter, body).map(
          (issue) => `${frontmatter.slug}: ${issue}`
        )
      );
    }

    expect(issues).toEqual([]);
  });

  it('uses descriptive alt text across published projects', async () => {
    const issues: string[] = [];

    for (const { frontmatter, body } of await listPublishedProjects()) {
      issues.push(
        ...validateProjectImageAccessibility(frontmatter, body).map(
          (issue) => `${frontmatter.slug}: ${issue}`
        )
      );
    }

    expect(issues).toEqual([]);
  });

  it('has probed dimensions for every published content image', async () => {
    const issues: string[] = [];

    for (const { frontmatter, body } of await listPublishedArticles()) {
      const imagePaths = extractArticleImageRefs(body, {
        thumbnail: frontmatter.thumbnail,
        thumbnailAlt: frontmatter.title,
      }).map((image) => image.src);

      for (const src of imagePaths) {
        if (!(src in manifest)) {
          issues.push(`${frontmatter.slug}: missing manifest entry for ${src}`);
        }
      }
    }

    for (const { frontmatter, body } of await listPublishedProjects()) {
      const imagePaths = extractProjectImageRefs(body, {
        thumbnail: frontmatter.thumbnail,
        gallery: frontmatter.gallery,
        galleryAlt: frontmatter.galleryAlt,
        title: frontmatter.title,
      }).map((image) => image.src);

      for (const src of imagePaths) {
        if (!(src in manifest)) {
          issues.push(`${frontmatter.slug}: missing manifest entry for ${src}`);
        }
      }
    }

    expect(issues).toEqual([]);
  });

  it('assigns unique anchor ids within each article', async () => {
    const issues: string[] = [];

    for (const { frontmatter, body } of await listPublishedArticles()) {
      const anchorIds = extractArticleImageRefs(body, {
        thumbnail: frontmatter.thumbnail,
        thumbnailAlt: frontmatter.title,
      }).map((image) => image.anchorId);
      const unique = new Set(anchorIds);

      if (unique.size !== anchorIds.length) {
        issues.push(`${frontmatter.slug}: duplicate anchor ids among ${anchorIds.join(', ')}`);
      }
    }

    expect(issues).toEqual([]);
  });
});
