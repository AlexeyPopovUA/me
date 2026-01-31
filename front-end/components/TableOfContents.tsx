"use client";

import React, { useMemo, useCallback, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUp, List } from 'lucide-react';
import { TOCHeading, flattenTOC } from '@/lib/toc-types';
import { clsx } from 'clsx';

interface TOCListProps {
    heading: TOCHeading;
    onItemClick?: () => void;
    className?: string;
}

export const TOCList: React.FC<TOCListProps> = ({ heading, onItemClick, className }) => {
    const flatTOC = useMemo(() => flattenTOC(heading), [heading]);

    const handleClick = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        }
        onItemClick?.();
    }, [onItemClick]);

    return (
        <nav className={clsx("space-y-1", className)}>
            {flatTOC.map((item) => {
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
    );
};

interface TableOfContentsProps {
    heading: TOCHeading;
    className?: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
    heading,
    className = '',
}) => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <TOCList heading={heading} className="max-h-[60vh] overflow-y-auto" />
        </nav>
    );
};

export default TableOfContents;

/* Mobile TOC Panel */

interface MobileTOCPanelProps {
    heading: TOCHeading;
    isOpen: boolean;
    onClose: () => void;
    className?: string;
}

export const MobileTOCPanel: React.FC<MobileTOCPanelProps> = ({ heading, isOpen, onClose, className }) => {
    const panelCls = clsx(
        "fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg transition-all duration-500 ease-in-out overflow-hidden overscroll-contain",
        {
            "max-h-[70vh] opacity-100": isOpen,
            "max-h-0 opacity-0": !isOpen
        }
    );

    const overlayCls = clsx(
        "fixed inset-0 bg-black/50 z-40 transition-opacity duration-500 touch-none overscroll-contain",
        {
            "opacity-100 pointer-events-auto": isOpen,
            "opacity-0 pointer-events-none": !isOpen
        }
    );

    return (
        <div className={className}>
            {/* Overlay */}
            <div className={overlayCls} onClick={onClose} />

            {/* Panel */}
            <div className={panelCls}>
                <div className="p-5 pb-8 max-h-[70vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-semibold text-foreground">Table of Contents</h3>
                        <button 
                            onClick={onClose}
                            className="text-2xl text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                            &times;
                        </button>
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">Navigate through the article</p>
                    <TOCList heading={heading} onItemClick={onClose} />
                </div>
            </div>
        </div>
    );
};
