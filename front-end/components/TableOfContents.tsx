import React from 'react';
import {TOCHeading} from "@/lib/toc-parser";

interface TableOfContentsProps {
  heading: TOCHeading;
  className?: string;
  onHeadingClick?: (id: string) => void;
}

// TODO Refactor this to use React components (See the recursive case)
function TableOfContents({heading, className = ''}: TableOfContentsProps) {
  const renderHeading = (heading: TOCHeading) =>
    (
      <li key={heading.id ?? heading.title} className="">
        <a
          href={`#${heading.id}`}
          className="hover:text-amber-600 no-underline block"
        >
          {heading.title}
        </a>
        {heading.children && heading.children.length > 0 && (
          <ul>
            {heading.children.map(child => renderHeading(child))}
          </ul>
        )}
      </li>
    );

  return (
    <nav className={`toc ${className}`} aria-label="Table of contents">
      <div className="text-md font-semibold mb-4">Table of Contents</div>
      <div className="toc-first-container max-h-[70vh] overflow-y-auto overflow-x-hidden">
        <ul className="text-sm">
          {heading.children?.map(heading => renderHeading(heading))}
        </ul>
      </div>
    </nav>
  );
}

export default TableOfContents;