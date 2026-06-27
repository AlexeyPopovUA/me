import type { Metadata } from 'next';

import { getContentMarkdownPath } from '@/lib/markdown-paths';
import { getRssMetadataObject } from '@/lib/rss';
import { ensurePathSlash } from '@/lib/utils';

type ContentAlternatesOptions = {
  includeRss?: boolean;
};

export function buildContentAlternates(
  contentPath: string,
  options?: ContentAlternatesOptions
): NonNullable<Metadata['alternates']> {
  const types: Record<string, string> = {
    'text/markdown': getContentMarkdownPath(contentPath),
  };

  if (options?.includeRss) {
    Object.assign(types, getRssMetadataObject());
  }

  return {
    canonical: ensurePathSlash(contentPath),
    types,
  };
}
