'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { commentsConfig } from '@/app/configuration/comments';

export function GiscusComments() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
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
    );
}
