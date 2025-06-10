export const availablePostTypes = ["article", "project"] as const;

export type PostType = typeof availablePostTypes[number];

export type CommonPostSchema = {
    title: string;
    slug: string;
    date: string;
    lastMod?: string;
    author?: string;
    draft?: boolean;
    description: string;
    thumbnail: string;
}
