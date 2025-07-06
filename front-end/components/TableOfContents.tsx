import React from 'react';
import { TOCHeading } from '@/lib/toc-parser';
import GoTop from './ScrollUpButton';

interface TableOfContentsProps {
    heading: TOCHeading;
    className?: string;
    onHeadingClick?: (id: string) => void;
}

// TODO Refactor this to use React components (See the recursive case)
function TableOfContents({ heading, className = '' }: TableOfContentsProps) {
    const renderHeading = (heading: TOCHeading) => (
        <li key={heading.id ?? heading.title} className="">
            <a href={`#${heading.id}`} className="block no-underline hover:text-amber-600">
                {heading.title}
            </a>
            {heading.children && heading.children.length > 0 && <ul>{heading.children.map((child) => renderHeading(child))}</ul>}
        </li>
    );

    return (
        <nav className={`toc ${className}`} aria-label="Table of contents">
            <div className="text-md mb-2 font-bold text-center">Table of Contents</div>
            <div className="text-sm mb-4 text-center">Navigate through the article</div>
            <GoTop cls='mb-4 border-none bg-none' />
            <div className="toc-first-container max-h-[65vh] overflow-x-hidden overflow-y-auto">
                <ul className="text-sm">{heading.children?.map((heading) => renderHeading(heading))}</ul>
            </div>
        </nav>
    );
}

export default TableOfContents;
