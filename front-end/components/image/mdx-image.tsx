import React from "react";

import {imageLoader} from "@/components/image/image-loader";
import ContentImage from "@/components/image/ContentImage";

/**
 * @todo Add types
 * @todo Implement a correct image with dimensions
 * @todo Add blur photo loader
 */
const MDXImage = (props: any) => {
    // todo Set image size from MD width/height properties
    return (
        <figure>
            <ContentImage className="max-w-fit" loader={imageLoader}
                          width={800} height={500} src={props.src}
                          alt={props.alt}/>
            <figcaption className="text-center">{props.title}</figcaption>
        </figure>

    );
};

export default MDXImage;
