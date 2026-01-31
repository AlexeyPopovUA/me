export interface TOCHeading {
  id: string;
  title: string;
  level: number;
  children?: TOCHeading[];
}

// Flatten hierarchical TOC structure to a flat list, only including h2 and h3 (levels 2 and 3)
export function flattenTOC(heading: TOCHeading): TOCHeading[] {
  const result: TOCHeading[] = [];
  const seenIds = new Set<string>();

  function traverse(h: TOCHeading) {
    if (h.level > 1 && h.level <= 3) {
      if (!seenIds.has(h.id)) {
        seenIds.add(h.id);
        result.push(h);
      }
    }

    if (h.children && h.level < 3) {
      h.children.forEach(child => traverse(child));
    }
  }

  traverse(heading);
  return result;
}
