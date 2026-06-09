'use client';

import Link from 'next/link';

const COLORING_MAGIC_URL = 'https://coloringmagic.art';

export function CurrentProjectBanner() {
    return (
        <p className="text-muted-foreground max-w-xl mb-8 text-sm leading-relaxed">
            Currently building{' '}
            <Link href={COLORING_MAGIC_URL} className="text-primary hover:underline">
                Coloring Magic Art
            </Link>
            {' '}
            — custom printable coloring books with AI. If you&apos;re curious, I&apos;d love you to check it out.
        </p>
    );
}
