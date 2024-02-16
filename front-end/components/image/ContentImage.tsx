"use client";

import clsx from 'clsx';
import type {ImageProps as NextImageProps} from 'next/image';
import NextImage from 'next/image';
import {useCallback} from 'react';
import type {Slide} from "yet-another-react-lightbox";

import useLightbox from "@/components/image/useLightBox";
import {generateLBSlides} from "@/lib/image";

export interface ImageProps extends NextImageProps {
    shouldOpenLightbox?: boolean
}

const ContentImage = ({shouldOpenLightbox = true, ...rest}: ImageProps) => {
    const {openLightbox, renderLightbox} = useLightbox();

    const handleOpenLightbox = useCallback(() => {
        if (shouldOpenLightbox) {
            openLightbox();
        }
    }, [openLightbox, shouldOpenLightbox]);

    const isThumb = rest.id === 'thumbnail-image';
    const className = clsx(
        `flex justify-center`,
        shouldOpenLightbox && 'cursor-zoom-in',
        isThumb && 'thumbnail-image'
    );

    const slides = generateLBSlides([rest.src as string]) as Slide[];

    return (
        <>
            <NextImage {...rest} className={className} quality={70} loading="lazy"
                       data-umami-event={isThumb ? 'view-post-thumbnail' : 'view-image-in-lightbox'}
                       placeholder="blur"
                       onClick={handleOpenLightbox}/>
            {renderLightbox({
                slides, carousel: {
                    finite: true
                }
            })}
        </>
    )
};

export default ContentImage;
