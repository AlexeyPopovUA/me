'use client'

import {ImageLoaderProps} from "next/image";
import {getInsideImageURL} from "@/lib/image";

export const imageLoaderLightbox = (props: ImageLoaderProps) => {
    const { src, width, quality } = props;

    return getInsideImageURL({src, width, quality});
}
