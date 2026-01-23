import Link from "next/link";

import {PostType} from "@/lib/posts";
import {ThumbnailImage} from "@/components/image/animated-image-loading/thumbnail-image";
import Tag from "@/components/primitive/Tag";
import {getInsideImageURL} from "@/lib/image";
import {readBlurredImageSrcPair} from "@/lib/image-server";

type Props = {
  type: PostType,
  slug: string;
  title: string;
  date?: string;
  description: string;
  thumbnail: string;
  link: string;
  tags?: string[];
  projectType?: string;
};

export async function PostCard(props: Props) {
  const {blurDataURL, ratio} = await readBlurredImageSrcPair({src: props.thumbnail});
  const imageURL = getInsideImageURL({ src: props.thumbnail, width: 560, height: 560, quality: 75 });

  return (
    <Link className="hover:text-amber-600 hover:border-amber-500 border-2 rounded-md p-4 relative" href={props.link}
          passHref>
      <div className="flex flex-col items-stretch pb-4 hover:text-amber-600 ">
        {/* Own project mark */}
        {props.projectType === "Own project" && (
          <div className="absolute top-2 left-2 bg-amber-500 text-white px-2 py-1 rounded text-sm font-medium shadow-lg z-10">
            Own project
          </div>
        )}

        <ThumbnailImage
          className="mx-auto h-56 mb-4"
          imageClassName="h-56 object-contain"
          unoptimized={true}
          src={imageURL}
          blurDataURL={blurDataURL}
          alt={props.title}
          loading="lazy"
          width={560}
          height={560 / ratio}
        />

        <div className="font-bold text-xl underline mb-2">{props.title}</div>
        {props.date ? <div className="text-sm text-gray-600 mb-4">{props.date}</div> : null}
        {props.tags ? <div className="text-sm text-gray-600 mb-4 flex flex-row flex-wrap gap-2">
          {props.tags?.map(tag => <Tag key={tag} item={tag}/>)}
        </div> : null}
        <div className="text-md text-gray-600">{props.description}</div>
      </div>
    </Link>
  );
}
