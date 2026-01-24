import Link from 'next/link';
import { PostType } from '@/lib/posts';
import { ThumbnailImage } from '@/components/image/animated-image-loading/thumbnail-image';
import { getInsideImageURL } from '@/lib/image';
import { readBlurredImageSrcPair } from '@/lib/image-server';
import { PostCardClient } from '@/components/post-card-client';

type Props = {
    type: PostType;
    slug: string;
    title: string;
    date?: string;
    description: string;
    thumbnail: string;
    link: string;
    tags?: string[];
    projectType?: string;
    index: number;
};

export async function PostCard(props: Props) {
    const { blurDataURL, ratio } = await readBlurredImageSrcPair({ src: props.thumbnail });
    const imageURL = getInsideImageURL({ src: props.thumbnail, width: 560, height: 560, quality: 75 });

    return (
        <PostCardClient
            {...props}
            imageURL={imageURL}
            blurDataURL={blurDataURL}
            ratio={ratio}
        />
    );
}
