"use client"

import {imageLoader} from "@/components/image/image-loader";
import React from "react";
import Image from "next/image";

const BlogThumbnailImage = ({src, alt}: { src: string; alt: string; }) => <Image className="flex-1 aspect-video object-contain"
                                                              loader={imageLoader}
                                                              placeholder="blur"
                                                              blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                                                              width={700} height={330}
                                                              src={src}
                                                              alt={alt}/>;

export default BlogThumbnailImage;
