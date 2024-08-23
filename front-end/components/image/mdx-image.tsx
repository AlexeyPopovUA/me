import React from "react";
import clsx from "clsx";

import {ContentImage} from "@/components/image/ContentImage";
import {readBlurredImageSrcPair} from "@/lib/image";
import {ThumbnailImage} from "@/components/image/animated-image-loading/thumbnail-image";
import {imageLoader} from "@/components/image/image-loader";

/**
 * @todo Add types
 */
const MDXImage = async (props: any) => {
  const {src, blurDataURL, ratio} = await readBlurredImageSrcPair({src: props.src});

  const className = clsx(
    `w-full cursor-zoom-in`,
    {
      'thumbnail-image': props.id === 'thumbnail-image'
    }
  );

  return (
    <figure>
      <ContentImage
        shouldOpenLightbox={true}
        src={src}
      >
        <ThumbnailImage
          src={src}
          loader={imageLoader}
          alt={props.alt}
          width={800}
          height={800 / ratio}
          blurDataURL={blurDataURL}
          className={className}
          quality={70}
          loading="lazy"
          placeholder="blur"
        />
      </ContentImage>
      <figcaption className="text-center">{props.title}</figcaption>
    </figure>

  );
};

export default MDXImage;
