import Image from "next/image";
import React from "react";

import {imageLoader} from "@/components/image/image-loader";

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
        <Image src={props.src}
               alt={props.alt} width={800} height={500}
               loader={imageLoader}/>
    );
};

export default MDXImage;
