"use client";

import clsx from 'clsx';
import type {ImageProps as NextImageProps} from 'next/image';
import NextImage from 'next/image';
import {useCallback} from 'react';

import useLightbox from "@/components/image/useLightBox";
import {generateLBSlides} from "@/lib/image";

export let BLUR_IMAGE_DATA_URL =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvWS1LgAGJQIpt50GkgAAAABJRU5ErkJggg==';

export let LOGO_IMAGE_PATH = '/static/images/logo.jpg';

export interface ImageProps extends NextImageProps {
    shouldOpenLightbox?: boolean
}

const ContentImage = ({shouldOpenLightbox = true, ...rest}: ImageProps) => {
    let blurDataURL = '';
    if (rest.src !== LOGO_IMAGE_PATH) {
        blurDataURL = BLUR_IMAGE_DATA_URL;
    }

    const {openLightbox, renderLightbox} = useLightbox();

    let handleOpenLightbox = useCallback(() => {
        if (shouldOpenLightbox) {
            openLightbox();
        }
    }, [openLightbox, shouldOpenLightbox]);

    let isThumb = rest.id === 'thumbnail-image'
    let className = clsx(
        `flex justify-center`,
        shouldOpenLightbox && 'cursor-zoom-in',
        isThumb && 'thumbnail-image'
    )

    const slides = generateLBSlides([rest.src as string]);

    return (
        <>
            <NextImage {...rest} className={className} quality={70}
                       data-umami-event={isThumb ? 'view-post-thumbnail' : 'view-image-in-lightbox'}
                       blurDataURL={blurDataURL} onClick={handleOpenLightbox}/>
            {renderLightbox({
                slides, carousel: {
                    finite: true
                }
            })}
        </>
    )
};

export default ContentImage;
