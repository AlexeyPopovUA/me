"use client";

import {useMemo, useState} from "react";
import type {Slide} from "yet-another-react-lightbox";

import {ThumbnailImage} from "@/components/image/thumbnail-image";
import useLightbox from "@/components/image/useLightBox";
import {generateLBSlides} from "@/lib/image";

type Props = {
    imageCfgs: { src: string; blurDataURL: string; ratio: number; }[];
};

function Gallery(props: Props) {
    const [index, setIndex] = useState(-1);
    const lightBoxSlides = useMemo(() => generateLBSlides(props.imageCfgs.map(image => image.src)), [props.imageCfgs]) as Slide[];
    const {openLightbox, renderLightbox} = useLightbox();

    return <>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-4">
            {props.imageCfgs.map((imageCfg, index) => (
                <div key={imageCfg.src} className="cursor-pointer bg-slate-100 aspect-video">
                    <ThumbnailImage
                        onClick={() => {
                            setIndex(index);
                            openLightbox();
                        }}
                        src={imageCfg.src} blurDataURL={imageCfg.blurDataURL} alt={`Gallery image ${index}`}
                        containerClassName="max-h-full m-auto" imageClassName=""
                        loading="lazy"
                        width={350}
                        height={350 / imageCfg.ratio}
                    />
                </div>

            ))}
        </div>

        {renderLightbox({slides: lightBoxSlides, index})}
    </>
}

export default Gallery;
