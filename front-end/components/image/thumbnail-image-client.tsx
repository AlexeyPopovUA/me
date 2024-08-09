'use client';

import React, {useCallback, useMemo, useState} from "react";
import Image, {ImageProps} from "next/image";
import clsx from "clsx";

import {imageLoader} from "@/components/image/image-loader";

type Props = {
    src: string;
    alt: string;
    blurDataURL: string;
    width: number;
    height: number;
    onClick?: () => void;
    imageClassName?: string;
};

export function ThumbnailImageClient({src, alt, blurDataURL, width, height, onClick, imageClassName}: Props) {
    const [loaded, setLoaded] = useState(false);
    const onImageLoad = useCallback(() => {
        setLoaded(true);
    }, []);

    const completeImageClassName = clsx(imageClassName, "absolute h-52 object-contain bg-center bg-contain")

    const commonCfg: Partial<ImageProps> = useMemo(() => ({
        className: completeImageClassName,
        width,
        height,
        loading: "lazy",
        style: {
            transition: "opacity 0.3s ease-in-out",
            /*Override to keep the size of blurred next/image equal to the original one*/
            backgroundSize: "contain !important"
        },
        onClick
    }), [completeImageClassName, height, width, onClick]);

    return (
        <>
            <Image
                {...commonCfg}
                src={blurDataURL}
                style={{
                    ...commonCfg.style,
                    opacity: loaded ? 0 : 1
                }}
                alt={alt}
            />
            <Image
                {...commonCfg}
                loader={imageLoader}
                onLoad={onImageLoad}
                src={src}
                style={{
                    ...commonCfg.style,
                    opacity: loaded ? 1 : 0
                }}
                alt={alt}
            />
        </>
    );
}
