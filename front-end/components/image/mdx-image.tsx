import React from "react";

import {imageLoader} from "@/components/image/image-loader";
import ContentImage from "@/components/image/ContentImage";
import {readBlurredImageSrcPair} from "@/lib/image";

/**
 * @todo Add types
 * @todo Implement a correct image with dimensions
 * @todo Add blur photo loader
 */
const MDXImage = async (props: any) => {
    const {src, blurDataURL} = await readBlurredImageSrcPair({src: props.src});
    // todo Set image size from own image properties
    return (
        <figure>
            <ContentImage className="max-w-fit" loader={imageLoader}
                          width={800} height={500} src={src}
                          blurDataURL={blurDataURL}
                          alt={props.alt}/>
            <figcaption className="text-center">{props.title}</figcaption>
        </figure>

    );
};

export default MDXImage;
