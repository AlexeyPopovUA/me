import {Nodes} from 'hast';
import {read} from "to-vfile";
import {fromMarkdown} from "mdast-util-from-markdown";
import {toHast} from "mdast-util-to-hast";
import {slug} from 'github-slugger'

export interface TOCHeading {
  id: string;
  title: string;
  level: number;
  children?: TOCHeading[];
}

function extractTOC(ast: Nodes): TOCHeading[] {
  const headings: TOCHeading[] = [];
  const stack: TOCHeading[] = [];
  let lastLevel = 0;

  function visit(node: Nodes) {
    if (node.type === 'element' && /^h[1-6]$/.test(node.tagName)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const title = (node.children[0] as any)?.value as string;
      const level = parseInt(node.tagName[1]);
      const id = slug(title);

      const heading: TOCHeading = {id, title, level, children: []};

      if (level > lastLevel) {
        if (stack.length > 0) {
          stack[stack.length - 1].children?.push(heading);
        } else {
          headings.push(heading);
        }
        stack.push(heading);
      } else {
        while (stack.length > 0 && stack[stack.length - 1].level >= level) {
          stack.pop();
        }
        if (stack.length > 0) {
          stack[stack.length - 1].children?.push(heading);
        } else {
          headings.push(heading);
        }
        stack.push(heading);
      }
      lastLevel = level;
    }

    if ('children' in node) {
      node.children.forEach((child) => visit(child));
    }
  }

  visit(ast);
  return headings;
}

export async function readTOC({path}: { path: string }) {
  const source = await read(path, {encoding: 'utf-8'});
  const mdast = fromMarkdown(source.value);
  const hast = toHast(mdast);

  const toc = extractTOC(hast);

  // Sometimes the first heading is not the main title (maybe, the front matter influence)
  return toc.find((heading) => heading.level === 1);
}