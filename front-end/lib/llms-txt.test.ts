import { describe, expect, it } from 'vitest';

import { getBlogMarkdownPath, getResumeMarkdownPath } from '@/lib/markdown-paths';
import { buildLlmsFullTxt, buildLlmsTxt } from '@/lib/llms-txt';

describe('llms.txt generation', () => {
  it('builds a spec-compliant llms.txt index', () => {
    const llmsTxt = buildLlmsTxt({
      articles: [
        {
          title: 'Example Article',
          slug: 'example-article',
          description: 'An example article description.',
        },
      ],
      projects: [
        {
          title: 'Example Project',
          slug: 'example-project',
          description: 'An example project description.',
        },
      ],
    });

    expect(llmsTxt.startsWith('# Oleksii Popov\n\n>')).toBe(true);
    expect(llmsTxt).toContain('## Articles');
    expect(llmsTxt).toContain(
      '- [Example Article](https://oleksiipopov.com/blog/example-article/)'
    );
    expect(llmsTxt).toContain(
      `([markdown](https://oleksiipopov.com${getBlogMarkdownPath('example-article')}))`
    );
    expect(llmsTxt).toContain(
      `([markdown](https://oleksiipopov.com${getResumeMarkdownPath()}))`
    );
    expect(llmsTxt).toContain('https://oleksiipopov.com/llms-full.txt');
    expect(llmsTxt).not.toContain('https://oleksiipopov.com/llms-full.txt/');
  });

  it('joins full-text documents with separators', () => {
    expect(buildLlmsFullTxt(['# One', '# Two'])).toBe('# One\n\n---\n\n# Two');
  });
});
