"use client";

import {useMemo, useState} from "react";

import useLightbox from "@/components/image/useLightBox";
import {generateLBSlides} from "@/lib/image";
import GalleryThumbnailImage from "@/components/image/gallery-thumbnail-image";

type Props = {
    images: string[];
};

const Gallery = (props: Props) => {
    const [index, setIndex] = useState(-1);
    const lightBoxSlides = useMemo(() => generateLBSlides(props.images), [props.images]);
    const {openLightbox, renderLightbox} = useLightbox();

    return <>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2">
            {props.images.map((image, index) => <GalleryThumbnailImage key={image} src={image} onClick={() => {
                setIndex(index);
                openLightbox();
            }} alt={`Gallery image ${index}`}/>)}
        </div>

        {renderLightbox({slides: lightBoxSlides, index})}
    </>
}

export default Gallery;
