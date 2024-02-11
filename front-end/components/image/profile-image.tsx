"use client"

import React from "react";
import Image from "next/image";

import {imageLoader} from "@/components/image/image-loader";

type Props = {
    src: string;
    blurDataURL: string;
}

const ProfileImage = (props: Props) => <Image className="rounded-full border-4 border-amber-500 aspect-square" loader={imageLoader}
                                  placeholder="blur"
                                  quality={70}
                                  blurDataURL={props.blurDataURL}
                                  width={300} height={300} src={props.src}
                                  alt="My profile photo"/>;

export default ProfileImage;
