"use client";

import React, {
    useCallback,
    useEffect,
    useState,
    type KeyboardEvent as ReactKeyboardEvent,
} from 'react'
import type {ImageProps as NextImageProps} from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import {imageLoaderLightbox} from "@/components/image/image-loader-lightbox";


export interface ImageLightBoxProps extends Pick<NextImageProps, 'src'> {
    closeLightbox: () => void
}

export function ImageLightbox({ src, closeLightbox }: ImageLightBoxProps) {
    let [imgLoaded, setImgLoaded] = useState(false)
    let [close, setClose] = useState(false)

    let handleClose = useCallback(() => {
        setClose(true)
        document.documentElement.classList.remove('prevent-scroll', 'lightbox-loading')
        setTimeout(() => closeLightbox(), 300)
    }, [closeLightbox])

    let handleKeydown = useCallback(
        (e: ReactKeyboardEvent | KeyboardEvent) => {
            if (e.key === 'Escape') handleClose()
        },
        [handleClose]
    )

    useEffect(() => {
        document.documentElement.classList.add('prevent-scroll')
        window.addEventListener('keydown', handleKeydown)
        return () => window.removeEventListener('keydown', handleKeydown)
    }, [handleKeydown])

    useEffect(() => {
        if (imgLoaded) {
            setTimeout(() => {
                document.documentElement.classList.remove('lightbox-loading')
            }, 150)
        }
    }, [imgLoaded])

    let style = {
        '--tw-bg-opacity': 0.8,
        opacity: !close && imgLoaded ? 1 : 0,
    } as React.CSSProperties

    return (
        <div
            role="button"
            tabIndex={0}
            className="lightbox-overlay fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-300 ease-out"
            style={style}
            onClick={handleClose}
            onKeyDown={handleKeydown}
        >
            <div className="relative flex h-full w-full items-center justify-center">
                <div className="absolute inset-x-0 top-0 flex justify-between">
                    <button className="fixed top-4 right-4 mr-4 flex-none hover:text-amber-500 text-5xl font-semibold duration-200 cursor-pointer text-white"
                       onClick={handleClose}>&times;</button>

                </div>
                <Image
                    quality={90}
                    src={src.toString()}
                    onLoad={() => setImgLoaded(true)}
                    loader={imageLoaderLightbox}
                    className="cursor-zoom-out p-2 object-contain w-full h-full"
                    width={800}
                    height={500}
                    alt="Lightbox"
                    sizes="(max-width: 768px) 50vw, 100vw"
                />
            </div>
        </div>
    )
}