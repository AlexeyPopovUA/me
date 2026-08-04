/**
 * Redirect `require('typescript')` / `import('typescript')` to
 * `@typescript/typescript6` so typescript-eslint can use the JS compiler API
 * while the project keeps TypeScript 7 for `tsc` / `next build`.
 *
 * TypeScript 7 ships without a stable JS API until 7.1; see
 * https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/
 */
'use strict';

const Module = require('module');

const originalResolveFilename = Module._resolveFilename;

Module._resolveFilename = function resolveTypescript6(request, parent, isMain, options) {
  if (request === 'typescript') {
    try {
      return originalResolveFilename.call(this, '@typescript/typescript6', parent, isMain, options);
    } catch {
      // Fall through to the real typescript package if the bridge is missing.
    }
  }
  return originalResolveFilename.call(this, request, parent, isMain, options);
};
