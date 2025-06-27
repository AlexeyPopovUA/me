'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

const GoTop = (props: { cls?: string }) => {
    const cls = clsx('right-2 bottom-2 rounded-md border-2 bg-white', props.cls);
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
            <button className="p-2 cursor-pointer" onClick={handleUpClick}>
                &uarr; UP
            </button>
        </div>
    );
};
export default GoTop;
