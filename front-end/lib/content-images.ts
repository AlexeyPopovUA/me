import { STRUCTURED_DATA_IMAGE_WIDTH } from '@/lib/image-constants';
import { getScaledImageDimensions } from '@/lib/image-dimensions';

export const THUMBNAIL_ANCHOR_ID = 'thumbnail';

export type ContentImageRef = {
  src: string;
  alt: string;
  caption?: string;
  anchorId: string;
  width: number;
  height: number;
};

const MARKDOWN_IMAGE_PATTERN =
  /!\[([^\]]*)]\((\/(?:articles|projects|shared|pages)\/[^\s)]+)(?:\s+"([^"]*)")?\)/g;

const JSX_CONTENT_IMAGE_ATTR_PATTERN =
  /\b(?:poster|src)=["'](\/(?:articles|projects|shared|pages)\/[^"']+\.(?:png|jpe?g|webp|gif|avif))["']/gi;

export function isContentImagePath(src: string) {
  return /^\/(?:articles|projects|shared|pages)\//.test(src);
}

export function getImageAnchorId(src: string) {
  const pathWithoutExtension = src.replace(/\.[^.]+$/, '').replace(/^\/+/, '');
  const anchorId = pathWithoutExtension
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return anchorId || 'image';
}

function resolveUniqueAnchorId(baseAnchorId: string, usedAnchorIds: Set<string>) {
  if (!usedAnchorIds.has(baseAnchorId)) {
    usedAnchorIds.add(baseAnchorId);
    return baseAnchorId;
  }

  let suffix = 2;
  while (usedAnchorIds.has(`${baseAnchorId}-${suffix}`)) {
    suffix += 1;
  }

  const anchorId = `${baseAnchorId}-${suffix}`;
  usedAnchorIds.add(anchorId);
  return anchorId;
}

function getAltFromPath(src: string) {
  const filename = src.split('/').pop()?.replace(/\.[^.]+$/, '') ?? '';
  return filename.replace(/[-_]+/g, ' ');
}

function buildImageRef(
  src: string,
  alt: string,
  usedAnchorIds: Set<string>,
  options: {
    caption?: string;
    anchorId?: string;
  } = {}
): ContentImageRef {
  const dimensions = getScaledImageDimensions(src, STRUCTURED_DATA_IMAGE_WIDTH);

  return {
    src,
    alt,
    ...(options.caption ? { caption: options.caption } : {}),
    anchorId: resolveUniqueAnchorId(
      options.anchorId ?? getImageAnchorId(src),
      usedAnchorIds
    ),
    ...dimensions,
  };
}

function appendUniqueImage(
  refs: ContentImageRef[],
  seen: Set<string>,
  image: ContentImageRef
) {
  if (seen.has(image.src)) {
    return;
  }

  seen.add(image.src);
  refs.push(image);
}

function appendBodyImages(
  refs: ContentImageRef[],
  seen: Set<string>,
  usedAnchorIds: Set<string>,
  body: string
) {
  for (const match of body.matchAll(MARKDOWN_IMAGE_PATTERN)) {
    const [, alt = '', src, title] = match;
    if (!isContentImagePath(src)) {
      continue;
    }

    appendUniqueImage(
      refs,
      seen,
      buildImageRef(src, alt || title || '', usedAnchorIds, { caption: title })
    );
  }

  for (const match of body.matchAll(JSX_CONTENT_IMAGE_ATTR_PATTERN)) {
    const src = match[1];
    if (!isContentImagePath(src)) {
      continue;
    }

    appendUniqueImage(
      refs,
      seen,
      buildImageRef(src, getAltFromPath(src), usedAnchorIds)
    );
  }
}

export function extractArticleImageRefs(
  body: string,
  options: {
    thumbnail?: string;
    thumbnailAlt?: string;
  } = {}
): ContentImageRef[] {
  const refs: ContentImageRef[] = [];
  const seen = new Set<string>();
  const usedAnchorIds = new Set<string>();

  if (options.thumbnail && isContentImagePath(options.thumbnail)) {
    appendUniqueImage(
      refs,
      seen,
      buildImageRef(
        options.thumbnail,
        options.thumbnailAlt ?? '',
        usedAnchorIds,
        { anchorId: THUMBNAIL_ANCHOR_ID }
      )
    );
  }

  appendBodyImages(refs, seen, usedAnchorIds, body);

  return refs;
}

export function extractProjectImageRefs(
  body: string,
  options: {
    thumbnail?: string;
    gallery?: string[];
    galleryAlt?: string[];
    title?: string;
  } = {}
): ContentImageRef[] {
  const refs: ContentImageRef[] = [];
  const seen = new Set<string>();
  const usedAnchorIds = new Set<string>();

  if (options.thumbnail && isContentImagePath(options.thumbnail)) {
    appendUniqueImage(
      refs,
      seen,
      buildImageRef(
        options.thumbnail,
        options.title ? `${options.title} project thumbnail` : '',
        usedAnchorIds,
        { anchorId: THUMBNAIL_ANCHOR_ID }
      )
    );
  }

  for (const [index, src] of (options.gallery ?? []).entries()) {
    if (!isContentImagePath(src)) {
      continue;
    }

    const alt =
      options.galleryAlt?.[index] ??
      (options.title
        ? `${options.title} — screenshot ${index + 1} of ${options.gallery?.length ?? 0}`
        : '');

    appendUniqueImage(refs, seen, buildImageRef(src, alt, usedAnchorIds));
  }

  appendBodyImages(refs, seen, usedAnchorIds, body);

  return refs;
}
