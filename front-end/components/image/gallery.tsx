"use client";

import {useMemo, useState} from "react";
import PhotoAlbum, {Photo} from "react-photo-album";

import useLightbox from "@/components/image/useLightBox";
import {generateLBSlides, getCoverImageURL} from "@/lib/image";

type Props = {
    images: string[];
};

const breakpoints = [640, 384, 256];

const generateGallerySlides = (images: string[]): Photo[] => {
    const width = 384;
    const height = width * 3 / 4;

    return images.map((image) => ({
        src: getCoverImageURL({src: image, quality: 85, width, height}),
        width,
        height,
        srcSet: breakpoints.map((breakpoint) => ({
            width: breakpoint,
            height: breakpoint * 3 / 4,
            src: getCoverImageURL({src: image, quality: 50, width: breakpoint, height: breakpoint * 3 / 4})
        })),
    }));
};

const Gallery = (props: Props) => {
    const [index, setIndex] = useState(-1);
    const gallerySlides: Photo[] = useMemo(() => generateGallerySlides(props.images), [props.images]);
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
