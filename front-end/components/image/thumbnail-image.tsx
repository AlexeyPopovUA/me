import React from "react";
import Image from "next/image";

import {imageLoader} from "@/components/image/image-loader";

type Props = {
    src: string;
    alt: string;
    blurDataURL: string;
    width: number;
    height: number;
};

const ThumbnailImage = ({src, alt, blurDataURL, width, height}: Props) => <Image
    className="flex-1 aspect-video object-contain"
    loader={imageLoader}
    loading="lazy"
    placeholder="blur"
    blurDataURL={blurDataURL}
    width={width} height={height}
    src={src}
    alt={alt}/>;

export default ThumbnailImage;
