import React from "react";
import clsx from "clsx";

import {ThumbnailImageClient} from "@/components/image/thumbnail-image-client";

type Props = {
    src: string;
    alt: string;
    blurDataURL: string;
    width: number;
    height: number;
    onClick?: () => void;
    imageClassName?: string;
    containerClassName?: string;
};

function ThumbnailImage({src, alt, blurDataURL, width, height, onClick, imageClassName, containerClassName}: Props) {
    const completeContainerClassName = clsx(containerClassName, "relative flex flex-shrink-0 items-center mb-4 h-52");

    return (
        <div className={completeContainerClassName}>
            <ThumbnailImageClient
                blurDataURL={blurDataURL}
                width={width} height={height}
                src={src}
                onClick={onClick}
                imageClassName={imageClassName}
                alt={alt}/>
        </div>
    );
}

export default ThumbnailImage;
