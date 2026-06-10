import { describe, expect, it } from 'vitest';

import {
  extractArticleImageRefs,
  getImageAnchorId,
  THUMBNAIL_ANCHOR_ID,
} from '@/lib/content-images';

describe('content image extraction', () => {
  it('derives stable anchor ids from image paths', () => {
    expect(getImageAnchorId('/articles/example/article-hero.png')).toBe(
      'articles-example-article-hero'
    );
  });

  it('extracts thumbnail, markdown, and jsx images in order', () => {
    const body = `
![Architecture diagram](/articles/example/diagram.png "Architecture overview")

![Screenshot](/articles/example/screenshot.png)

<ArticleVideo src="/articles/example/demo.webm" poster="/articles/example/demo-poster.png"></ArticleVideo>
`;

    expect(
      extractArticleImageRefs(body, {
        thumbnail: '/articles/example/article-hero.png',
        thumbnailAlt: 'Article hero image for the example post',
      })
    ).toEqual([
      expect.objectContaining({
        src: '/articles/example/article-hero.png',
        anchorId: THUMBNAIL_ANCHOR_ID,
      }),
      expect.objectContaining({
        src: '/articles/example/diagram.png',
        caption: 'Architecture overview',
      }),
      expect.objectContaining({
        src: '/articles/example/screenshot.png',
      }),
      expect.objectContaining({
        src: '/articles/example/demo-poster.png',
        anchorId: 'articles-example-demo-poster',
      }),
    ]);
  });

  it('resolves duplicate base filenames with numeric suffixes', () => {
    const body = `
![First](/articles/example/og.jpg)
![Second](/articles/example/og.png)
`;

    const refs = extractArticleImageRefs(body);
    expect(refs.map((image) => image.anchorId)).toEqual([
      'articles-example-og',
      'articles-example-og-2',
    ]);
  });
});
