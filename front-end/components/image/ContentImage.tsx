"use client";

import clsx from 'clsx';
import type {ImageProps as NextImageProps} from 'next/image';
import NextImage from 'next/image';
import {useState} from 'react';
import {ImageLightbox} from './ImageLightbox';

export let BLUR_IMAGE_DATA_URL =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvWS1LgAGJQIpt50GkgAAAABJRU5ErkJggg==';

export let LOGO_IMAGE_PATH = '/static/images/logo.jpg';

export interface ImageProps extends NextImageProps {
    shouldOpenLightbox?: boolean
}

const ContentImage = ({shouldOpenLightbox = true, ...rest}: ImageProps) => {
    let blurDataURL = ''
    if (rest.src !== LOGO_IMAGE_PATH) {
        blurDataURL = BLUR_IMAGE_DATA_URL
    }

    let [openLightbox, setOpenLightbox] = useState(false)
    let handleOpenLightbox = () => {
        if (!shouldOpenLightbox) return
        document.documentElement.classList.add('lightbox-loading')
        setOpenLightbox(true)
    }
    let isThumb = rest.id === 'thumbnail-image'
    let className = clsx(
        `flex justify-center`,
        shouldOpenLightbox && 'cursor-zoom-in',
        isThumb && 'thumbnail-image'
    )

    return (
        <>

            <NextImage {...rest} className={className} quality={70}
                       data-umami-event={isThumb ? 'view-post-thumbnail' : 'view-image-in-lightbox'}
                       blurDataURL={blurDataURL} onClick={handleOpenLightbox}/>
            {openLightbox && (
                <ImageLightbox closeLightbox={() => setOpenLightbox(false)} {...rest}/>
            )}
        </>
    )
};

export default ContentImage;
