"use client";

import {useMemo, useState} from "react";
import type {Slide} from "yet-another-react-lightbox";

import useLightbox from "@/components/image/useLightBox";
import {generateLBSlides} from "@/lib/image";
import GalleryThumbnailImage from "@/components/image/gallery-thumbnail-image";

type Props = {
    imageCfgs: { src: string; blurDataURL: string; }[];
};

const Gallery = (props: Props) => {
    const [index, setIndex] = useState(-1);
    const lightBoxSlides = useMemo(() => generateLBSlides(props.imageCfgs.map(image => image.src)), [props.imageCfgs]) as Slide[];
    const {openLightbox, renderLightbox} = useLightbox();

    return <>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2">
            {props.imageCfgs.map((imageCfg, index) => (
                <GalleryThumbnailImage key={imageCfg.src} src={imageCfg.src}
                                       blurDataURL={imageCfg.blurDataURL}
                                       onClick={() => {
                                           setIndex(index);
                                           openLightbox();
                                       }} alt={`Gallery image ${index}`}/>
            ))}
        </div>

        {renderLightbox({slides: lightBoxSlides, index})}
    </>
}

export default Gallery;
