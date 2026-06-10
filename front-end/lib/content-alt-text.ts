import { extractArticleImageRefs, extractProjectImageRefs } from '@/lib/content-images';
import type { ArticlesSchema } from '@/content/articles/articles-schema';
import type { ProjectsSchema } from '@/content/projects/projects-schema';

export const MIN_ARTICLE_IMAGE_ALT_LENGTH = 24;
export const GENERIC_ALT_FALLBACK = 'Article illustration';

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildSubjectPattern(subject: string) {
  return new RegExp(`\\b${escapeRegExp(subject)}\\b`, 'i');
}

function getSubjectPatterns(subjects: string[] = []) {
  return subjects.map(buildSubjectPattern);
}

export function validateImageAlt(
  alt: string,
  src: string,
  options: {
    subjects?: string[];
    requireSubject?: boolean;
  } = {}
) {
  const issues: string[] = [];
  const trimmed = alt.trim();

  if (!trimmed || trimmed === GENERIC_ALT_FALLBACK) {
    issues.push(`alt text for "${src}" is missing or uses the generic fallback`);
  }

  if (trimmed.length < MIN_ARTICLE_IMAGE_ALT_LENGTH) {
    issues.push(
      `alt text for "${src}" is too short (${trimmed.length} chars; minimum ${MIN_ARTICLE_IMAGE_ALT_LENGTH})`
    );
  }

  const subjectPatterns = getSubjectPatterns(options.subjects);
  if (
    options.requireSubject !== false &&
    subjectPatterns.length > 0 &&
    !subjectPatterns.some((pattern) => pattern.test(trimmed))
  ) {
    issues.push(
      `alt text for "${src}" should name at least one featured subject from frontmatter subjects`
    );
  }

  return issues;
}

export function validateArticleImageAlt(
  alt: string,
  src: string,
  subjects: string[] = []
) {
  return validateImageAlt(alt, src, { subjects, requireSubject: true });
}

export function validateArticleImageAccessibility(
  article: ArticlesSchema,
  body: string
) {
  const issues: string[] = [];

  for (const image of extractArticleImageRefs(body, {
    thumbnail: article.thumbnail,
    thumbnailAlt: article.title,
  })) {
    issues.push(...validateArticleImageAlt(image.alt, image.src, article.subjects));
  }

  return issues;
}

export function validateProjectImageAccessibility(
  project: ProjectsSchema,
  body: string
) {
  const issues: string[] = [];

  if (project.galleryAlt && project.galleryAlt.length !== project.gallery.length) {
    issues.push(
      `galleryAlt length (${project.galleryAlt.length}) must match gallery length (${project.gallery.length})`
    );
  }

  for (const image of extractProjectImageRefs(body, {
    thumbnail: project.thumbnail,
    gallery: project.gallery,
    galleryAlt: project.galleryAlt,
    title: project.title,
  })) {
    issues.push(...validateImageAlt(image.alt, image.src, { requireSubject: false }));
  }

  return issues;
}
