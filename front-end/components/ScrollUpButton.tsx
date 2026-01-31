'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { List } from 'lucide-react';

interface GoTopProps {
    cls?: string;
    showTocButton?: boolean;
    onTocClick?: () => void;
}

const GoTop = (props: GoTopProps) => {
    const cls = clsx('right-2 bottom-2 rounded-md border border-border bg-card text-foreground shadow-sm', props.cls);
    const router = useRouter();

    const handleBackToBlogClick = useCallback(() => {
        router.push('/blog');
    }, [router]);

    const handleUpClick = useCallback(() => {
        window.scrollTo({ top: 0 });
    }, []);

    return (
        <div className={cls}>
            <button className="mr-4 p-2 cursor-pointer" onClick={handleBackToBlogClick}>
                &larr; To Blog
            </button>
            {props.showTocButton && (
                <button className="mr-4 p-2 cursor-pointer flex items-center gap-1" onClick={props.onTocClick}>
                    <List size={16} />
                    TOC
                </button>
            )}
            <button className="p-2 cursor-pointer" onClick={handleUpClick}>
                &uarr; UP
            </button>
        </div>
    );
};
export default GoTop;
