export type PostType = "article" | "project";

export type CommonPostSchema = {
    title: string;
    slug: string;
    date: string;
    draft?: boolean;
    description: string;
    thumbnail: string;
}
