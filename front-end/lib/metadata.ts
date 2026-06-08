import type { Metadata } from 'next';

type TwitterMetadataOptions = {
    title: string;
    description: string;
    images?: string | string[];
};

export function getTwitterMetadata(options: TwitterMetadataOptions): NonNullable<Metadata['twitter']> {
    return {
        card: 'summary_large_image',
        title: options.title,
        description: options.description,
        images: options.images,
    };
}
