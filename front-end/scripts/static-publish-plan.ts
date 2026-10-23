import path from 'node:path';

/** CloudFront only compresses objects in this size range. Smaller text is gzipped at upload. */
export const CLOUDFRONT_MIN_COMPRESS_BYTES = 1000;

/** How many published `_next/static` generations to keep, including the one just uploaded. */
export const DEFAULT_STATIC_HISTORY = 5;

export const IMMUTABLE_CACHE_CONTROL = 'public, max-age=31536000, immutable';
export const HTML_CACHE_CONTROL = 'public, max-age=0, must-revalidate';
export const MEDIA_CACHE_CONTROL = 'public, max-age=86400';

const GZIP_EXTENSIONS = new Set([
  '.js',
  '.mjs',
  '.css',
  '.html',
  '.htm',
  '.json',
  '.map',
  '.xml',
  '.txt',
  '.svg',
  '.webmanifest',
]);

const CONTENT_TYPES: Record<string, string> = {
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.html': 'text/html',
  '.htm': 'text/html',
  '.json': 'application/json',
  '.map': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.eot': 'application/vnd.ms-fontobject',
};

export interface SourceFile {
  key: string;
  size: number;
}

export interface PlannedObject {
  key: string;
  size: number;
  cacheControl: string;
  contentType: string;
  contentEncoding?: 'gzip';
  staticAsset: boolean;
}

export interface UploadGroup {
  cacheControl: string;
  contentType: string;
  contentEncoding?: 'gzip';
  staticAsset: boolean;
  keys: string[];
}

export function isHashedStaticKey(key: string): boolean {
  return key.startsWith('_next/static/');
}

export function contentTypeForKey(key: string): string {
  const extension = path.posix.extname(key).toLowerCase();
  if (extension === '.xml' && key.endsWith('rss.xml')) {
    return 'application/rss+xml';
  }
  return CONTENT_TYPES[extension] ?? 'application/octet-stream';
}

export function cacheControlForKey(key: string): string {
  if (isHashedStaticKey(key)) {
    return IMMUTABLE_CACHE_CONTROL;
  }
  // HTML, sitemaps, RSS, and robots change with the site and must not outlive a deploy.
  if (/\.(html|htm|xml|txt)$/i.test(key)) {
    return HTML_CACHE_CONTROL;
  }
  return MEDIA_CACHE_CONTROL;
}

export function shouldGzip(key: string, size: number): boolean {
  if (size <= 0 || size >= CLOUDFRONT_MIN_COMPRESS_BYTES) {
    return false;
  }
  const extension = path.posix.extname(key).toLowerCase();
  return GZIP_EXTENSIONS.has(extension);
}

export function planObjects(files: SourceFile[]): PlannedObject[] {
  return files
    .map((file) => {
      const gzip = shouldGzip(file.key, file.size);
      return {
        key: file.key,
        size: file.size,
        cacheControl: cacheControlForKey(file.key),
        contentType: contentTypeForKey(file.key),
        ...(gzip ? { contentEncoding: 'gzip' as const } : {}),
        staticAsset: isHashedStaticKey(file.key),
      };
    })
    .sort((left, right) => Number(right.staticAsset) - Number(left.staticAsset) || left.key.localeCompare(right.key));
}

export function groupPlannedUploads(objects: PlannedObject[]): UploadGroup[] {
  const groups: UploadGroup[] = [];

  for (const object of objects) {
    const existing = groups.find(
      (group) =>
        group.cacheControl === object.cacheControl &&
        group.contentType === object.contentType &&
        group.contentEncoding === object.contentEncoding &&
        group.staticAsset === object.staticAsset
    );

    if (existing) {
      existing.keys.push(object.key);
      continue;
    }

    groups.push({
      cacheControl: object.cacheControl,
      contentType: object.contentType,
      ...(object.contentEncoding ? { contentEncoding: object.contentEncoding } : {}),
      staticAsset: object.staticAsset,
      keys: [object.key],
    });
  }

  return groups.sort((left, right) => Number(right.staticAsset) - Number(left.staticAsset));
}

export function staticKeys(keys: string[]): string[] {
  return keys.filter(isHashedStaticKey);
}

/**
 * The first recorded generation keeps every static object already in the bucket,
 * so enabling retention does not delete the previous build's chunks. Later
 * generations record only the files from that build.
 */
export function buildStaticManifest(options: {
  localStaticKeys: string[];
  remoteStaticKeys: string[];
  hasHistory: boolean;
}): string[] {
  const local = uniqueSorted(options.localStaticKeys);
  if (options.hasHistory) {
    return local;
  }
  return uniqueSorted([...local, ...options.remoteStaticKeys]);
}

export function staticKeysToPrune(options: {
  remoteStaticKeys: string[];
  manifestsNewestFirst: string[][];
  keep: number;
}): string[] {
  if (!Number.isInteger(options.keep) || options.keep < 1) {
    throw new Error(`STATIC_DEPLOY_HISTORY must be a positive integer, received ${options.keep}`);
  }

  const retain = new Set<string>();
  for (const manifest of options.manifestsNewestFirst.slice(0, options.keep)) {
    for (const key of manifest) {
      retain.add(key);
    }
  }

  if (retain.size === 0) {
    throw new Error('Refusing to prune _next/static because the retention set is empty');
  }

  return options.remoteStaticKeys.filter((key) => !retain.has(key)).sort();
}

export function staleNonStaticKeys(remoteKeys: string[], localKeys: string[]): string[] {
  const local = new Set(localKeys);
  return remoteKeys
    .filter((key) => !isHashedStaticKey(key) && !local.has(key))
    .sort();
}

export function formatManifest(keys: string[]): string {
  return `${uniqueSorted(keys).join('\n')}\n`;
}

export function parseManifest(text: string): string[] {
  return uniqueSorted(
    text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && !line.startsWith('/') && !line.includes('..'))
  );
}

function uniqueSorted(keys: string[]): string[] {
  return [...new Set(keys)].sort();
}
