"use client";

import {useMemo, useState} from "react";
import PhotoAlbum, {Photo} from "react-photo-album";

import {imageLoader} from "@/components/image/image-loader";
import {getCroppedImageURL} from "@/components/image/image-loader-cropped";
import useLightbox from "@/components/image/useLightBox";

type Props = {
    images: string[];
};

const breakpoints = [640, 384, 256];

const generateSlides = (images: string[]): Photo[] => {
    const width = 384;
    const height = width * 3 / 4;

    return images.map((image) => ({
        src: getCroppedImageURL({src: image, quality: 85, width, height}),
        width,
        height,
        srcSet: breakpoints.map((breakpoint) => ({
            width: breakpoint,
            height: breakpoint * 3 / 4,
            src: getCroppedImageURL({src: image, quality: 50, width: breakpoint, height: breakpoint * 3 / 4})
        })),
    }));
};

const generateLBSlides = (images: string[]): Photo[] => {
    const width = 2048;
    //const height = width * 3 / 4;

    // @ts-ignore
    return images.map((image) => ({
        // TODO Use utility, not a loader!
        src: imageLoader({src: image, quality: 85, width}),
        width,
        //height,
        srcSet: [2160, 1080, 640, 410, 344, 256].map((breakpoint) => ({
            width: breakpoint,
            //height: breakpoint * 3 / 4,
            src: imageLoader({src: image, quality: 85, width: breakpoint})
        })),
    }));
};

const Gallery = (props: Props) => {
    const [index, setIndex] = useState(-1);
    const gallerySlides: Photo[] = useMemo(() => generateSlides(props.images), [props.images]);
    const lightBoxSlides: Photo[] = useMemo(() => generateLBSlides(props.images), [props.images]);
    const { openLightbox, renderLightbox } = useLightbox();

    return <>
        <PhotoAlbum
            layout="rows"
            photos={gallerySlides}
            onClick={({index: current}) => {
                setIndex(current);
                openLightbox();
            }}
        />
        {renderLightbox({slides: lightBoxSlides, index})}
    </>
}

export default Gallery;
