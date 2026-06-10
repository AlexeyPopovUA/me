import fs from 'node:fs/promises';

export async function readMdxBodyByPath(path: string) {
  const source = await fs.readFile(path, 'utf8');
  const match = /^---[\s\S]*?---\n?([\s\S]*)$/.exec(source);

  return match?.[1]?.trim() ?? source.trim();
}
