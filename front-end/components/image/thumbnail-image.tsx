import React from "react";
import clsx from "clsx";
import {ImageProps} from "next/image";

import {ThumbnailImageClient} from "@/components/image/thumbnail-image-client";

type Props = ImageProps & {
    // overridden as required
    blurDataURL: string;
    width: number;
    height: number;
    // custom
    imageClassName?: string;
    containerClassName?: string;
};

export function ThumbnailImage(props: Props) {
    return (
        <div className={clsx(props.containerClassName, `relative`)} style={{aspectRatio: props.width / props.height}}>
            <ThumbnailImageClient
                blurDataURL={props.blurDataURL}
                width={props.width} height={props.height}
                loading={props.loading}
                src={props.src}
                onClick={props.onClick}
                className={props.imageClassName}
                alt={props.alt}/>
        </div>
    );
}
