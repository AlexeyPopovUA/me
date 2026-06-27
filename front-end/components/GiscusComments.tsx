'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';

import { commentsConfig } from '@/app/configuration/comments';

export function GiscusComments() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !containerRef.current) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' }
        );

        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, [mounted]);

    return (
        <div ref={containerRef}>
            {mounted && visible ? (
                <Giscus
                    repo={commentsConfig.repo}
                    repoId={commentsConfig.repoId}
                    category={commentsConfig.category}
                    categoryId={commentsConfig.categoryId}
                    mapping={commentsConfig.mapping}
                    reactionsEnabled="1"
                    emitMetadata="0"
                    inputPosition="bottom"
                    theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
                    lang={commentsConfig.lang}
                    loading="lazy"
                />
            ) : null}
        </div>
    );
}
