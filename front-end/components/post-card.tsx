import Link from "next/link";

import {PostType} from "@/lib/posts";
import ThumbnailImage from "@/components/image/thumbnail-image";
import Tag from "@/components/primitive/Tag";

export function PostCard(props: {
    type: PostType,
    slug: string;
    title: string;
    date?: string;
    description: string;
    thumbnail: string;
    link: string;
    tags?: string[];
}) {
    return <Link className="hover:text-amber-600 hover:border-amber-500 border-2 rounded-md p-4"
                 href={props.link} passHref
    >
        <div className="flex flex-col items-stretch pb-4 hover:text-amber-600">
            <div className="flex flex-row mb-4">
                <ThumbnailImage src={props.thumbnail} alt={props.title}/>
            </div>
            <div className="font-bold text-xl underline mb-2">{props.title}</div>
            {props.date ? <div className="text-sm text-gray-600 mb-4">{props.date}</div> : null}
            {props.tags ?
                <div className="text-sm text-gray-600 mb-4 flex flex-row flex-wrap gap-2">
                    {props.tags?.map(tag => <Tag key={tag} item={tag}/>)}
                </div> : null}
            <div className="text-md text-gray-600">{props.description}</div>
        </div>
    </Link>;
}