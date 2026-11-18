import fs from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');

describe('unlisted resume routes', () => {
  it('disallows private resume paths in robots.txt', () => {
    const robots = fs.readFileSync(robotsPath, 'utf8');

    expect(robots).toContain('Disallow: /resume-print/');
    expect(robots).toContain('Disallow: /resume-olena/');
  });
});