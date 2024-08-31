"use client";

import {useMemo, useState} from "react";
import type {Slide} from "yet-another-react-lightbox";

import {ThumbnailImage} from "@/components/image/animated-image-loading/thumbnail-image";
import useLightbox from "@/components/image/useLightBox";
import {generateLBSlides} from "@/lib/image";

export namespace Gallery {
  export type Props = {
    imageCfgs: {
      src: string;
      imageURL: string;
      blurDataURL: string;
      ratio: number;
    }[];
  };
}

export function Gallery(props: Gallery.Props) {
  const [index, setIndex] = useState(-1);
  const lightBoxSlides = useMemo(() => generateLBSlides(props.imageCfgs.map(image => image.src)), [props.imageCfgs]) as Slide[];
  const {openLightbox, renderLightbox} = useLightbox();

  return <>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-4">
      {props.imageCfgs.map((imageCfg, index) => (
        <div key={imageCfg.src} className="mb-4 cursor-pointer bg-slate-100 aspect-video">
          <ThumbnailImage
            onClick={() => {
              setIndex(index);
              openLightbox();
            }}
            unoptimized={true}
            src={imageCfg.imageURL}
            blurDataURL={imageCfg.blurDataURL}
            alt={`Gallery image ${index}`}
            className="mx-auto h-32"
            imageClassName="h-32 object-contain"
            loading="lazy"
            width={250}
            height={250 / imageCfg.ratio}
          />
        </div>
      ))}
    </div>

    {renderLightbox({slides: lightBoxSlides, index})}
  </>
}
