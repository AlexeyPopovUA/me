import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

import { extractArticleImageRefs, extractProjectImageRefs } from '../lib/content-images';
import { listPublishedArticles, listPublishedProjects } from '../lib/content-iteration';
import {
  IMAGE_PROBE_CONTAIN_WIDTH,
  IMAGE_PROBE_MAX_DIMENSION,
} from '../lib/image-constants';
import { getContainImageURL, getFullSizeImageURL, getInsideImageURL } from '../lib/image';

async function probeImageDimensions(src: string) {
  const candidates = [
    getFullSizeImageURL({ src }),
    getInsideImageURL({
      src,
      width: IMAGE_PROBE_MAX_DIMENSION,
      height: IMAGE_PROBE_MAX_DIMENSION,
      quality: 80,
    }),
    getContainImageURL({ src, width: IMAGE_PROBE_CONTAIN_WIDTH, quality: 85 }),
  ];

  let lastError: Error | undefined;

  for (const url of candidates) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        lastError = new Error(`Failed to fetch ${src}: ${response.status} ${response.statusText}`);
        continue;
      }

      const metadata = await sharp(Buffer.from(await response.arrayBuffer())).metadata();
      if (!metadata.width || !metadata.height) {
        lastError = new Error(`Could not read dimensions for ${src}`);
        continue;
      }

      return {
        width: metadata.width,
        height: metadata.height,
      };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
    }
  }

  throw lastError ?? new Error(`Could not read dimensions for ${src}`);
}

async function main() {
  const imagePaths = new Set<string>();

  for (const { frontmatter, body } of await listPublishedArticles()) {
    for (const image of extractArticleImageRefs(body, {
      thumbnail: frontmatter.thumbnail,
      thumbnailAlt: frontmatter.title,
    })) {
      imagePaths.add(image.src);
    }
  }

  for (const { frontmatter, body } of await listPublishedProjects()) {
    for (const image of extractProjectImageRefs(body, {
      thumbnail: frontmatter.thumbnail,
      gallery: frontmatter.gallery,
      galleryAlt: frontmatter.galleryAlt,
      title: frontmatter.title,
    })) {
      imagePaths.add(image.src);
    }
  }

  const manifest: Record<string, { width: number; height: number }> = {};

  for (const src of [...imagePaths].sort()) {
    manifest[src] = await probeImageDimensions(src);
    console.log(`${src}: ${manifest[src].width}x${manifest[src].height}`);
  }

  const outputPath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../lib/image-manifest.json'
  );

  await fs.writeFile(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${Object.keys(manifest).length} entries to ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
