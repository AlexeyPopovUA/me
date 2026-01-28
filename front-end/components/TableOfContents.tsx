"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUp } from 'lucide-react';
import { TOCHeading } from '@/lib/toc-parser';
import { clsx } from 'clsx';

interface TableOfContentsProps {
    heading: TOCHeading;
    className?: string;
    onHeadingClick?: (id: string) => void;
}

// Flatten hierarchical TOC structure to a flat list, only including h2 and h3 (levels 2 and 3)
function flattenTOC(heading: TOCHeading): TOCHeading[] {
    const result: TOCHeading[] = [];
    const seenIds = new Set<string>();
    
    function traverse(h: TOCHeading) {
        // Only include levels 2 (H2) and 3 (H3), skip deeper levels
        if (h.level > 1 && h.level <= 3) {
            // Only add if we haven't seen this ID before
            if (!seenIds.has(h.id)) {
                seenIds.add(h.id);
                result.push(h);
            }
        }
        
        // Only traverse children if we're at level 3 or below (to catch h3 children)
        if (h.children && h.level < 3) {
            h.children.forEach(child => traverse(child));
        }
    }
    
    traverse(heading);
    return result;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
    heading,
    className = '',
}) => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Flatten the hierarchical TOC to a flat list
    const flatTOC = useMemo(() => flattenTOC(heading), [heading]);

    const handleClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        }
    };

    return (
        <nav className={clsx("toc", className)} aria-label="Table of contents">
            <h3 className="text-sm font-semibold text-foreground mb-2 !text-sm">Table of Contents</h3>
            <p className="text-xs text-muted-foreground mb-4">Navigate through the article</p>
            <div className="flex gap-4 mb-4 pb-4 border-b border-border">
                <Link 
                    href="/blog" 
                    className="text-sm !font-normal text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                    <ArrowLeft size={14} />
                    To Blog
                </Link>
                <button 
                    onClick={scrollToTop}
                    className="text-sm font-normal text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                    <ArrowUp size={14} />
                    UP
                </button>
            </div>
            <nav className="space-y-1 max-h-[60vh] overflow-y-auto">
                {flatTOC.map((item) => {
                    // Level 2 (H2) headings are top-level TOC items
                    // Level 3+ (H3+) headings are nested
                    const isLevel1 = item.level === 2;
                    const buttonClassName = `block w-full text-left text-sm py-1.5 transition-colors hover:text-primary ${
                        isLevel1 
                            ? "text-foreground font-medium" 
                            : "text-muted-foreground pl-3 text-xs"
                    }`;

                    return (
                        <button
                            key={item.id ?? item.title}
                            onClick={() => handleClick(item.id)}
                            className={buttonClassName}
                        >
                            {item.title}
                        </button>
                    );
                })}
            </nav>
        </nav>
    );
};

export default TableOfContents;
