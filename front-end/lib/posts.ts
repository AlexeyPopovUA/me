export const availablePostTypes = ["article", "project"] as const;

export type PostType = typeof availablePostTypes[number];

export type CommonPostSchema = {
    title: string;
    slug: string;
    date: Date;
    draft?: boolean;
    description: string;
    thumbnail: string;
}
