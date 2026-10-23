import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import {
  buildStaticManifest,
  cacheControlForKey,
  contentTypeForKey,
  formatManifest,
  groupPlannedUploads,
  HTML_CACHE_CONTROL,
  IMMUTABLE_CACHE_CONTROL,
  parseManifest,
  planObjects,
  staleNonStaticKeys,
  staticKeysToPrune,
} from './static-publish-plan';

describe('static publish plan', () => {
  it('uploads immutable _next/static objects before HTML and gzips sub-1000-byte css', () => {
    const planned = planObjects([
      { key: 'index.html', size: 20000 },
      { key: 'portfolio/example/index.html', size: 4000 },
      { key: '_next/static/chunks/2lhx5kypfv6w-.js', size: 8000 },
      { key: '_next/static/chunks/0squwgddb6xmj.css', size: 77 },
      { key: '_next/static/chunks/2ljy1yzs5tt49.css', size: 2400 },
      { key: 'api/rss.xml', size: 5000 },
      { key: 'favicon.ico', size: 1500 },
    ]);

    const groups = groupPlannedUploads(planned);
    const firstNonStatic = groups.findIndex((group) => !group.staticAsset);
    const lastStatic = groups.reduce(
      (last, group, index) => (group.staticAsset ? index : last),
      -1
    );
    expect(lastStatic).toBeGreaterThan(-1);
    expect(firstNonStatic).toBeGreaterThan(lastStatic);

    const smallCss = planned.find((object) => object.key.endsWith('0squwgddb6xmj.css'));
    expect(smallCss).toMatchObject({
      contentType: 'text/css',
      contentEncoding: 'gzip',
      cacheControl: IMMUTABLE_CACHE_CONTROL,
      staticAsset: true,
    });

    const largeCss = planned.find((object) => object.key.endsWith('2ljy1yzs5tt49.css'));
    expect(largeCss).toMatchObject({
      contentType: 'text/css',
      cacheControl: IMMUTABLE_CACHE_CONTROL,
    });
    expect(largeCss?.contentEncoding).toBeUndefined();

    const hyphenatedChunk = planned.find((object) => object.key.endsWith('2lhx5kypfv6w-.js'));
    expect(hyphenatedChunk).toMatchObject({
      contentType: 'text/javascript',
      cacheControl: IMMUTABLE_CACHE_CONTROL,
      staticAsset: true,
    });

    expect(cacheControlForKey('index.html')).toBe(HTML_CACHE_CONTROL);
    expect(cacheControlForKey('sitemap.xml')).toBe(HTML_CACHE_CONTROL);
    expect(contentTypeForKey('api/rss.xml')).toBe('application/rss+xml');
    expect(contentTypeForKey('favicon.ico')).toBe('image/x-icon');
    expect(contentTypeForKey('resume/index.md')).toBe('text/markdown');
    expect(cacheControlForKey('resume/index.md')).toBe(HTML_CACHE_CONTROL);
    expect(planned.find((object) => object.key === 'index.html')?.contentEncoding).toBeUndefined();
  });

  it('keeps the previous build chunks on the first recorded generation', () => {
    const manifest = buildStaticManifest({
      localStaticKeys: ['_next/static/chunks/new.js'],
      remoteStaticKeys: ['_next/static/chunks/new.js', '_next/static/chunks/previous.js'],
      hasHistory: false,
    });

    expect(manifest).toEqual([
      '_next/static/chunks/new.js',
      '_next/static/chunks/previous.js',
    ]);
    expect(formatManifest(manifest)).toBe(
      '_next/static/chunks/new.js\n_next/static/chunks/previous.js\n'
    );
    expect(parseManifest(formatManifest(manifest))).toEqual(manifest);
  });

  it('prunes static objects that fall outside the retained generations and leaves html deletion separate', () => {
    const current = ['_next/static/chunks/current.js'];
    const previous = ['_next/static/chunks/current.js', '_next/static/chunks/previous.js'];
    const ancient = ['_next/static/chunks/ancient.js'];

    expect(
      staticKeysToPrune({
        remoteStaticKeys: [
          '_next/static/chunks/current.js',
          '_next/static/chunks/previous.js',
          '_next/static/chunks/ancient.js',
        ],
        manifestsNewestFirst: [current, previous, ancient],
        keep: 2,
      })
    ).toEqual(['_next/static/chunks/ancient.js']);

    expect(
      staleNonStaticKeys(
        ['index.html', 'blog/removed/index.html', '_next/static/chunks/ancient.js'],
        ['index.html', '_next/static/chunks/current.js']
      )
    ).toEqual(['blog/removed/index.html']);
  });

  it('refuses to prune when the retention set is empty', () => {
    expect(() =>
      staticKeysToPrune({
        remoteStaticKeys: ['_next/static/chunks/ancient.js'],
        manifestsNewestFirst: [[]],
        keep: 1,
      })
    ).toThrow(/retention set is empty/);
  });

  it('publishes static files before HTML and invalidates only after upload', () => {
    const workflowPath = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      '../../.github/workflows/front-end.yml'
    );
    const workflow = fs.readFileSync(workflowPath, 'utf8');

    expect(workflow).not.toContain('s3 rm --recursive');
    const publish = workflow.indexOf('publish-static-site.ts');
    const invalidate = workflow.indexOf('create-invalidation');
    expect(publish).toBeGreaterThan(-1);
    expect(invalidate).toBeGreaterThan(publish);
  });
});
