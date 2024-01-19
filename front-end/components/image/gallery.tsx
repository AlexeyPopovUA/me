"use client";

import {useMemo, useState} from "react";
import PhotoAlbum, {Photo} from "react-photo-album";
import LightboxComponent from "yet-another-react-lightbox";

import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import {imageLoader} from "@/components/image/image-loader";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import {getCroppedImageURL} from "@/components/image/image-loader-cropped";

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
    const height = width * 3 / 4;

    return images.map((image) => ({
        // TODO Use utility, not a loader!
        src: imageLoader({src: image, quality: 85, width}),
        width,
        height,
        srcSet: [2160, 1080, 640, 384, 256].map((breakpoint) => ({
            width: breakpoint,
            height: breakpoint * 3 / 4,
            src: imageLoader({src: image, quality: 85, width: breakpoint})
        })),
    } ));
};

const Gallery = (props: Props) => {
    const [index, setIndex] = useState(-1);
    const [open, setOpen] = useState(false);
    const gallerySlides: Photo[] = useMemo(() => generateSlides(props.images), [props.images]);
    const lightBoxSlides: Photo[] = useMemo(() => generateLBSlides(props.images), [props.images]);

    return <>
        <PhotoAlbum
            layout="rows"
            photos={gallerySlides}
            //targetRowHeight={150}
            onClick={({ index: current }) => {
                setIndex(current);
                setOpen(true);
            }}
        />
        <LightboxComponent plugins={[Thumbnails]} slides={lightBoxSlides} index={index} open={open} close={() => setOpen(false)} />
    </>
}

export default Gallery;
