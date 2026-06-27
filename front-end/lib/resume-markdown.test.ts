import { describe, expect, it } from 'vitest';

import { buildResumeMarkdown } from '@/lib/resume-markdown';

describe('resume markdown', () => {
  it('includes core resume sections and canonical metadata', () => {
    const markdown = buildResumeMarkdown();

    expect(markdown).toContain("canonical_url: 'https://oleksiipopov.com/resume/'");
    expect(markdown).toContain('# Oleksii Popov');
    expect(markdown).toContain('## Experience');
    expect(markdown).toContain('## Skills');
    expect(markdown).toContain('## Education');
    expect(markdown).toContain('Synthesia');
  });
});
