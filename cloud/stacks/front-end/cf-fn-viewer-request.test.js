const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

function loadHandler(filename) {
  const code = fs.readFileSync(path.join(__dirname, filename), 'utf8');
  const sandbox = { console };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  assert.equal(typeof sandbox.handler, 'function');
  return sandbox.handler;
}

function request(uri, host) {
  return {
    request: {
      uri,
      headers: {
        host: { value: host },
      },
    },
  };
}

const hosting = loadHandler('cf-fn-viewer-request.js');
const oldBlog = loadHandler('old-blog-cf-fn-viewer-request.js');

test('hashed chunks with a hyphen before the extension stay files', () => {
  const uri = '/_next/static/chunks/2lhx5kypfv6w-.js';
  const result = hosting(request(uri, 'oleksiipopov.com'));
  assert.equal(result.uri, uri);
  assert.equal(result.statusCode, undefined);
});

test('css, underscore hashes, and font files stay files', () => {
  const uris = [
    '/_next/static/chunks/0squwgddb6xmj.css',
    '/_next/static/chunks/3i89gp8v27lm_.js',
    '/_next/static/chunks/3yq9-_02kt1gy.js',
    '/_next/static/media/83afe278b6a6bb3c-s.p.2bn3s6zvc0dyp.woff2',
    '/sitemap.xml',
    '/favicon.ico',
  ];

  for (const uri of uris) {
    assert.equal(hosting(request(uri, 'oleksiipopov.com')).uri, uri);
  }
});

test('directory requests map to index.html', () => {
  assert.equal(
    hosting(request('/portfolio/dynatrace-kubernetes-app/', 'oleksiipopov.com')).uri,
    '/portfolio/dynatrace-kubernetes-app/index.html'
  );
  assert.equal(
    hosting(request('/portfolio/dynatrace-kubernetes-app', 'oleksiipopov.com')).uri,
    '/portfolio/dynatrace-kubernetes-app/index.html'
  );
});

test('www hosts redirect to the naked domain without rewriting the asset', () => {
  const result = hosting(request('/_next/static/chunks/2lhx5kypfv6w-.js', 'www.oleksiipopov.com'));
  assert.equal(result.statusCode, 301);
  assert.equal(
    result.headers.location.value,
    'https://oleksiipopov.com/_next/static/chunks/2lhx5kypfv6w-.js'
  );
});

test('dev hosts prefix the branch and still keep hashed files intact', () => {
  const result = hosting(
    request('/_next/static/chunks/2lhx5kypfv6w-.js', 'my-branch.dev.oleksiipopov.com')
  );
  assert.equal(result.uri, '/my-branch/_next/static/chunks/2lhx5kypfv6w-.js');
});

test('old blog treats hyphenated asset names as files', () => {
  const result = oldBlog(request('/static/2lhx5kypfv6w-.js', 'blog.oleksiipopov.com'));
  assert.equal(result.statusCode, 404);
  assert.equal(result.statusDescription, 'File not found');
});

test('old blog still redirects known post paths', () => {
  const result = oldBlog(
    request(
      '/2023/07/03/serving-environment-specific-configurations-to-web-applications/',
      'blog.oleksiipopov.com'
    )
  );
  assert.equal(result.statusCode, 301);
  assert.match(result.headers.location.value, /^https:\/\/oleksiipopov\.com\/blog\//);
});
