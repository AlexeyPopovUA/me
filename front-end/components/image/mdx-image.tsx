import React from "react";

import {imageLoader} from "@/components/image/image-loader";
import ContentImage from "@/components/image/ContentImage";
import {readBlurredImageSrcPair} from "@/lib/image";

/**
 * @todo Add types
 */
const MDXImage = async (props: any) => {
    const {src, blurDataURL, ratio} = await readBlurredImageSrcPair({src: props.src});

    return (
        <figure>
            <ContentImage className="max-w-fit" loader={imageLoader}
                          width={800} height={800 / ratio} src={src}
                          blurDataURL={blurDataURL}
                          alt={props.alt}/>
            <figcaption className="text-center">{props.title}</figcaption>
        </figure>

    );
};

export default MDXImage;
