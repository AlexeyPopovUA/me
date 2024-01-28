"use client"

import {imageLoader} from "@/components/image/image-loader";
import React from "react";
import Image from "next/image";

type Props = {
    src: string;
    alt: string;
    onClick: () => void;
}

const GalleryThumbnailImage = ({src, alt, onClick}: Props) => <Image className="flex-1 aspect-video object-contain cursor-pointer bg-slate-100"
                                                                     onClick={onClick}
                                                                     loader={imageLoader}
                                                                     placeholder="blur"
                                                                     blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                                                                     width={700} height={330}
                                                                     src={src}
                                                                     alt={alt}/>;

export default GalleryThumbnailImage;
