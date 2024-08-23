'use client'

import {ImageLoaderProps} from "next/image";
import {getContainImageURL} from "@/lib/image";

export function imageLoader({src, width, quality}: ImageLoaderProps) {
  return getContainImageURL({src, width, quality})
}
