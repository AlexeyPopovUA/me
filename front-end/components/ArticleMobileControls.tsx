'use client';

import React, { useState, useCallback } from 'react';
import { TOCHeading } from '@/lib/toc-types';
import GoTop from '@/components/ScrollUpButton';
import { MobileTOCPanel } from '@/components/TableOfContents';

interface ArticleMobileControlsProps {
    toc?: TOCHeading;
    className?: string;
}

export const ArticleMobileControls: React.FC<ArticleMobileControlsProps> = ({ toc, className }) => {
    const [isTocOpen, setIsTocOpen] = useState(false);

    const handleTocToggle = useCallback(() => {
        setIsTocOpen(open => !open);
    }, []);

    const handleTocClose = useCallback(() => {
        setIsTocOpen(false);
    }, []);

    return (
        <>
            {toc && (
                <MobileTOCPanel 
                    heading={toc} 
                    isOpen={isTocOpen} 
                    onClose={handleTocClose} 
                />
            )}
            <GoTop 
                cls={className} 
                showTocButton={!!toc} 
                onTocClick={handleTocToggle} 
            />
        </>
    );
};
