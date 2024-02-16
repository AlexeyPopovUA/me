"use client"

import {imageLoader} from "@/components/image/image-loader";
import React from "react";
import Image from "next/image";

type Props = {
    src: string;
    blurDataURL: string;
    alt: string;
    onClick: () => void;
}

const GalleryThumbnailImage = ({src, blurDataURL, alt, onClick}: Props) => <Image className="flex-1 aspect-video object-contain cursor-pointer bg-slate-100"
                                                                     onClick={onClick}
                                                                     loader={imageLoader}
                                                                     placeholder="blur"
                                                                     blurDataURL={blurDataURL}
                                                                     width={350} height={165}
                                                                     src={src}
                                                                     alt={alt}/>;

export default GalleryThumbnailImage;
