import fs from 'node:fs/promises';
import matter from 'gray-matter';

export async function getFrontMatterDataByPath<T>(path: string) {
  const source = await fs.readFile(path, 'utf8');
  return matter(source).data as T;
}
