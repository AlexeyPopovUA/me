"use client";

import {PropsWithChildren, useCallback, useMemo} from 'react';
import type {Slide} from "yet-another-react-lightbox";

import useLightbox from "@/components/image/useLightBox";
import {generateLBSlides} from "@/lib/image";

export interface ImageProps extends PropsWithChildren {
    shouldOpenLightbox: boolean;
    src: string;
}

export function ContentImage({shouldOpenLightbox, src, children}: ImageProps) {
    const {openLightbox, renderLightbox} = useLightbox();

    const handleOpenLightbox = useCallback(() => {
        if (shouldOpenLightbox) {
            openLightbox();
        }
    }, [openLightbox, shouldOpenLightbox]);

    const slides = useMemo(() => generateLBSlides([src as string]) as Slide[], [src]);

    return (
        <>
            <div onClick={handleOpenLightbox}>
                {children}
            </div>

            {renderLightbox({
                slides, carousel: {
                    finite: true
                }
            })}
        </>
    )
}
