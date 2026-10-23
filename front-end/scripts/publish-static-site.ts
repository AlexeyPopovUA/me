import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import zlib from 'node:zlib';

import {
  buildStaticManifest,
  DEFAULT_STATIC_HISTORY,
  formatManifest,
  groupPlannedUploads,
  isHashedStaticKey,
  parseManifest,
  planObjects,
  staleNonStaticKeys,
  staticKeys,
  staticKeysToPrune,
  type SourceFile,
  type UploadGroup,
} from './static-publish-plan';

/**
 * Publish a Next.js static export without the previous `aws s3 rm --recursive`.
 *
 * Order:
 * 1. Upload `_next/static` (immutable, long cache) before HTML.
 * 2. Upload HTML and the rest with a short cache and an explicit Content-Type.
 * 3. Delete HTML and other non-hashed objects that this build no longer contains.
 * 4. Record the static file list and delete hashed chunks that are outside the
 *    last N generations. The first generation also retains whatever is already
 *    in the bucket, so the cutover does not drop the previous build's chunks.
 * 5. The workflow invalidates CloudFront only after this script exits 0.
 *
 * Text objects smaller than CloudFront's 1,000 byte compression floor are
 * uploaded gzipped with Content-Encoding. Larger objects stay uncompressed so
 * CloudFront can negotiate gzip and brotli.
 */

function resolveOutDir(): string {
  if (process.env.OUT_DIR) {
    return path.resolve(process.env.OUT_DIR);
  }
  const candidates = [path.resolve('out'), path.resolve('front-end/out')];
  const found = candidates.find((dir) => fs.existsSync(dir));
  if (!found) {
    throw new Error(`Static export not found. Looked in ${candidates.join(', ')}`);
  }
  return found;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required`);
  }
  return value;
}

function historySize(): number {
  const raw = process.env.STATIC_DEPLOY_HISTORY ?? String(DEFAULT_STATIC_HISTORY);
  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`STATIC_DEPLOY_HISTORY must be a positive integer, received ${raw}`);
  }
  return parsed;
}

function walk(outDir: string): SourceFile[] {
  const files: SourceFile[] = [];

  const visit = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        visit(fullPath);
        continue;
      }
      if (!entry.isFile()) {
        continue;
      }
      const key = path.relative(outDir, fullPath).split(path.sep).join('/');
      files.push({ key, size: fs.statSync(fullPath).size });
    }
  };

  visit(outDir);
  return files;
}

function runAws(args: string[]): string {
  const result = spawnSync('aws', args, {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(
      `aws ${args.slice(0, 2).join(' ')} failed with status ${result.status}: ${result.stderr}`
    );
  }
  return result.stdout;
}

function listKeys(bucket: string, prefix: string): string[] {
  const keys: string[] = [];
  let token: string | undefined;

  do {
    const args = ['s3api', 'list-objects-v2', '--bucket', bucket, '--prefix', prefix, '--output', 'json'];
    if (token) {
      args.push('--continuation-token', token);
    }
    const page = JSON.parse(runAws(args) || '{}') as {
      Contents?: { Key?: string }[];
      IsTruncated?: boolean;
      NextContinuationToken?: string;
    };
    for (const object of page.Contents ?? []) {
      if (object.Key) {
        keys.push(object.Key);
      }
    }
    token = page.IsTruncated ? page.NextContinuationToken : undefined;
  } while (token);

  return keys;
}

function relativeKey(fullKey: string, prefix: string): string | null {
  const root = `${prefix}/`;
  if (!fullKey.startsWith(root)) {
    return null;
  }
  const relative = fullKey.slice(root.length);
  if (!relative || relative.endsWith('/')) {
    return null;
  }
  return relative;
}

function deleteKeys(bucket: string, fullKeys: string[]) {
  for (let index = 0; index < fullKeys.length; index += 1000) {
    const batch = fullKeys.slice(index, index + 1000);
    const file = path.join(
      fs.mkdtempSync(path.join(os.tmpdir(), 's3-delete-')),
      'delete.json'
    );
    fs.writeFileSync(
      file,
      JSON.stringify({ Objects: batch.map((Key) => ({ Key })), Quiet: false })
    );
    const response = JSON.parse(
      runAws(['s3api', 'delete-objects', '--bucket', bucket, '--delete', `file://${file}`]) || '{}'
    ) as { Errors?: { Key?: string; Message?: string }[] };
    if (response.Errors && response.Errors.length > 0) {
      throw new Error(`Failed to delete S3 objects: ${JSON.stringify(response.Errors)}`);
    }
  }
}

function stageGroup(outDir: string, stageDir: string, group: UploadGroup) {
  for (const key of group.keys) {
    const target = path.join(stageDir, key);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    const bytes = fs.readFileSync(path.join(outDir, key));
    if (group.contentEncoding === 'gzip') {
      fs.writeFileSync(target, zlib.gzipSync(bytes, { level: 9 }));
    } else {
      fs.writeFileSync(target, bytes);
    }
  }
}

function uploadGroup(stageDir: string, destination: string, group: UploadGroup) {
  const args = [
    's3',
    'cp',
    stageDir,
    destination,
    '--recursive',
    '--cache-control',
    group.cacheControl,
    '--content-type',
    group.contentType,
    '--no-progress',
  ];
  if (group.contentEncoding) {
    args.push('--content-encoding', group.contentEncoding);
  }
  runAws(args);
}

function main() {
  const bucket = requireEnv('S3_HOSTING_BUCKET');
  const prefix = requireEnv('SAFE_SOURCE_NAME');
  if (prefix.startsWith('/') || prefix.includes('..') || prefix.includes('/')) {
    throw new Error(`Refusing unsafe SAFE_SOURCE_NAME: ${prefix}`);
  }

  const keep = historySize();
  const outDir = resolveOutDir();
  const files = walk(outDir);
  if (!files.some((file) => file.key.endsWith('.html'))) {
    throw new Error(`Refusing to publish ${outDir}: no HTML files`);
  }
  if (!files.some((file) => isHashedStaticKey(file.key))) {
    throw new Error(`Refusing to publish ${outDir}: no _next/static files`);
  }

  const planned = planObjects(files);
  const groups = groupPlannedUploads(planned);
  const destination = `s3://${bucket}/${prefix}`;
  const manifestPrefix = `_deploy-manifests/${prefix}`;

  if (process.env.PUBLISH_DRY_RUN === '1') {
    console.log(
      JSON.stringify(
        {
          destination,
          order: groups.map((group) => ({
            staticAsset: group.staticAsset,
            contentType: group.contentType,
            contentEncoding: group.contentEncoding ?? null,
            cacheControl: group.cacheControl,
            count: group.keys.length,
          })),
        },
        null,
        2
      )
    );
    return;
  }

  const staticGroups = groups.filter((group) => group.staticAsset);
  const pageGroups = groups.filter((group) => !group.staticAsset);
  console.log(
    `Uploading ${staticGroups.reduce((sum, group) => sum + group.keys.length, 0)} _next/static objects before HTML`
  );

  const stageRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'static-publish-'));
  const upload = (group: UploadGroup, index: number) => {
    const stageDir = path.join(stageRoot, `group-${index}`);
    stageGroup(outDir, stageDir, group);
    console.log(
      `Uploading ${group.keys.length} ${group.staticAsset ? 'static' : 'site'} objects as ${group.contentType}` +
        `${group.contentEncoding ? ` (${group.contentEncoding})` : ''}`
    );
    uploadGroup(stageDir, destination, group);
  };

  staticGroups.forEach((group, index) => upload(group, index));
  console.log('Uploading HTML and other non-hashed files');
  pageGroups.forEach((group, index) => upload(group, staticGroups.length + index));

  const remoteKeys = listKeys(bucket, `${prefix}/`)
    .map((key) => relativeKey(key, prefix))
    .filter((key): key is string => key !== null);
  const localKeys = files.map((file) => file.key);
  const stale = staleNonStaticKeys(remoteKeys, localKeys);
  if (stale.length > 0) {
    console.log(`Deleting ${stale.length} removed HTML and non-hashed objects`);
    deleteKeys(bucket, stale.map((key) => `${prefix}/${key}`));
  }

  const existingManifests = listKeys(bucket, `${manifestPrefix}/`)
    .map((key) => key.slice(`${manifestPrefix}/`.length))
    .filter((name) => name.endsWith('.txt'))
    .sort();
  const previousManifests = [...existingManifests].reverse().map((name) => {
    const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 's3-manifest-')), 'manifest.txt');
    runAws(['s3api', 'get-object', '--bucket', bucket, '--key', `${manifestPrefix}/${name}`, file]);
    return parseManifest(fs.readFileSync(file, 'utf8'));
  });

  const remoteStatic = staticKeys(remoteKeys);
  const manifestKeys = buildStaticManifest({
    localStaticKeys: staticKeys(localKeys),
    remoteStaticKeys: remoteStatic,
    hasHistory: existingManifests.length > 0,
  });
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace('.', '');
  const manifestName = `${stamp}.txt`;
  const manifestFile = path.join(stageRoot, manifestName);
  fs.writeFileSync(manifestFile, formatManifest(manifestKeys));
  runAws([
    's3',
    'cp',
    manifestFile,
    `s3://${bucket}/${manifestPrefix}/${manifestName}`,
    '--content-type',
    'text/plain',
    '--cache-control',
    'no-store',
    '--no-progress',
  ]);

  const prune = staticKeysToPrune({
    remoteStaticKeys: remoteStatic,
    manifestsNewestFirst: [manifestKeys, ...previousManifests],
    keep,
  });
  if (prune.length > 0) {
    console.log(`Pruning ${prune.length} _next/static objects outside the last ${keep} deploys`);
    deleteKeys(bucket, prune.map((key) => `${prefix}/${key}`));
  } else {
    console.log(`Keeping previous _next/static objects (${keep} deploy history)`);
  }

  // The new manifest is already stored. Keep the newest (keep - 1) older manifests.
  const manifestsToDelete = [...existingManifests].sort().reverse().slice(keep - 1);
  if (manifestsToDelete.length > 0) {
    deleteKeys(
      bucket,
      manifestsToDelete.map((name) => `${manifestPrefix}/${name}`)
    );
  }

  console.log('Publish finished. Invalidate CloudFront after this step.');
}

main();
