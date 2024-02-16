import React from "react";
import Image from "next/image";

import {imageLoader} from "@/components/image/image-loader";

type Props = {
    src: string; alt: string; blurDataURL: string;
};

const ThumbnailImage = ({src, alt, blurDataURL}: Props) => <Image
    className="flex-1 aspect-video object-contain"
    loader={imageLoader}
    loading="lazy"
    placeholder="blur"
    blurDataURL={blurDataURL}
    width={700} height={330}
    src={src}
    alt={alt}/>;

export default ThumbnailImage;
