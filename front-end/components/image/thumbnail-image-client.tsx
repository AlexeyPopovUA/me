'use client';

import React, {CSSProperties, useCallback, useMemo, useState} from "react";
import Image, {ImageProps} from "next/image";
import clsx from "clsx";

import {imageLoader} from "@/components/image/image-loader";

import "./thumbnail-client-image.css";

type Props = ImageProps & {
    // overridden as required
    blurDataURL: string;
    width: number;
    height: number;
};

export function ThumbnailImageClient(props: Props) {
    const [loaded, setLoaded] = useState(false);
    const onImageLoad = useCallback(() => {
        setLoaded(true);
    }, []);

    const commonCfg: Partial<ImageProps> = useMemo(() => ({
        className: clsx(props.className, `absolute top-0 bottom-0 left-0 right-0 thumbnail-client-image`),
        width: props.width,
        height: props.height,
        loading: props.loading,
        style: {
            aspectRatio: props.width / props.height
        },
        onClick: props.onClick
    }), [props.className, props.width, props.height, props.loading, props.onClick]);

    const blurredImageStyle: CSSProperties = useMemo(() => ({
        ...commonCfg.style,
        opacity: loaded ? 0 : 1
    }), [commonCfg.style, loaded]);

    const normalImageStyle: CSSProperties = useMemo(() => ({
        ...commonCfg.style,
        opacity: loaded ? 1 : 0
    }), [commonCfg.style, loaded]);

    return (
        <>
            <Image
                {...commonCfg}
                src={props.blurDataURL}
                style={blurredImageStyle}
                alt={props.alt}
            />
            <Image
                {...commonCfg}
                loader={imageLoader}
                onLoad={onImageLoad}
                src={props.src}
                style={normalImageStyle}
                alt={props.alt}
            />
        </>
    );
}
