import React from "react";

import {imageLoader} from "@/components/image/image-loader";
import ContentImage from "@/components/image/ContentImage";

/**
 * @todo Add types
 * @todo Implement a correct image with dimensions
 * @todo Add blur photo loader
 * @todo Add lightbox
 */
const MDXImage = (props: any) => {
    console.log("img -> next Image", props);
    // todo Set image size from MD width/height properties
    return (
        <ContentImage className="max-w-fit" loader={imageLoader}
                      width={800} height={500} src={props.src}
                      alt={props.alt}/>
    );
};

export default MDXImage;
