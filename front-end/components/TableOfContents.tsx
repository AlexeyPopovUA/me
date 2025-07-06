"use client";

import React from 'react';
import { TOCHeading } from '@/lib/toc-parser';
import GoTop from './ScrollUpButton';
import { clsx } from 'clsx';

interface TableOfContentsProps {
    heading: TOCHeading;
    className?: string;
    onHeadingClick?: (id: string) => void;
}

interface TOCHeadingItemProps {
    heading: TOCHeading;
    onHeadingClick?: (id: string) => void;
}

const TOCHeadingItem: React.FC<TOCHeadingItemProps> = ({ heading, onHeadingClick }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        if (onHeadingClick) {
            onHeadingClick(heading.id);
        } else {
            // Default smooth scroll behavior
            const element = document.getElementById(heading.id);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
            }
        }
    };

    return (
        <li key={heading.id ?? heading.title} className="">
            <a
                href={`#${heading.id}`}
                className="block no-underline hover:text-amber-600"
                onClick={handleClick}
            >
                {heading.title}
            </a>
            {heading.children && heading.children.length > 0 && (
                <ul>
                    {heading.children.map((child) => (
                        <TOCHeadingItem
                            key={child.id ?? child.title}
                            heading={child}
                            onHeadingClick={onHeadingClick}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

const TableOfContents: React.FC<TableOfContentsProps> = ({
    heading,
    className = '',
}) => {
    return (
        <nav className={clsx("toc", className)} aria-label="Table of contents">
            <div className="text-md mb-2 font-bold text-center">Table of Contents</div>
            <div className="text-sm mb-4 text-center">Navigate through the article</div>
            <GoTop cls='mb-4 border-none bg-none' />
            <div className="toc-first-container max-h-[65vh] overflow-x-hidden overflow-y-auto">
                <ul className="text-sm">
                    {heading.children?.map((headingItem) => (
                        <TOCHeadingItem
                            key={headingItem.id ?? headingItem.title}
                            heading={headingItem}
                        />
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default TableOfContents;
