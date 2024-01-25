'use client'

import {ImageLoaderProps} from "next/image";
import {getContainImageURL} from "@/lib/image";

export const imageLoader = (props: ImageLoaderProps) => {
    const { src, width, quality } = props;

   return getContainImageURL({src, width, quality})
}
