import React from 'react';
import {TOCHeading} from "@/lib/toc-parser";

interface TableOfContentsProps {
  heading: TOCHeading;
  className?: string;
  onHeadingClick?: (id: string) => void;
}

// TODO Refactpor this to use React components (See the recursive case)
function TableOfContents({heading, className = ''}: TableOfContentsProps) {
  const renderHeading = (heading: TOCHeading) =>
    (
      <li key={heading.id ?? heading.title} className="">
        <a
          href={`#${heading.id}`}
          className="hover:text-amber-600 no-underline"
        >
          {heading.title}
        </a>
        {heading.children && heading.children.length > 0 && (
          <ul className="list-none">
            {heading.children.map(child => renderHeading(child))}
          </ul>
        )}
      </li>
    );

  return (
    <nav className={`toc ${className}`} aria-label="Table of contents">
      <div className="text-md font-semibold mb-4">Table of Contents</div>
      <ul className="text-sm list-none">
        {heading.children?.map(heading => renderHeading(heading))}
      </ul>
    </nav>
  );
}

export default TableOfContents;