"use client"

import React from "react";
import Image from "next/image";

import {imageLoader} from "@/components/image/image-loader";

const ProfileImage = () => <Image className="rounded-full border-4 border-amber-500 aspect-square" loader={imageLoader}
                                  placeholder="blur"
                                  quality={70}
                                  blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                                  width={300} height={300} src="/pages/home/me-w-square-bg.jpg"
                                  alt="My profile photo"/>;

export default ProfileImage;
