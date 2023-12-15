'use client'

import {ImageLoaderProps} from "next/image";

const BASE_URL = "https://dqdoi2i9o4m2u.cloudfront.net";
const BUCKET = "serverless-image-handler-image-source";
const BASE_PATH = "me";

export const imageLoaderLightbox = (props: ImageLoaderProps) => {
    const { src, width, quality } = props;

    const encodedTask = {
        "bucket": BUCKET,
        "key": `${BASE_PATH}${src}`,
        "edits": {
            "resize": {
                "width": width,
                "fit": "inside"
            },
            webp: {
                quality
            },
            png: {
                quality
            },
            jpg: {
                quality
            }
        }
    };

    const stringifiedObject = JSON.stringify(encodedTask);
    const encodedObject = btoa(stringifiedObject);

    return `${BASE_URL}/${encodedObject}`
}
