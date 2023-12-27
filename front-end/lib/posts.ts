export const availablePostTypes = ["article", "project"] as const;

export type PostType = typeof availablePostTypes[number];

export type CommonPostSchema = {
    title: string;
    slug: string;
    date: string;
    draft?: boolean;
    description: string;
    thumbnail: string;
}

export const getPostLink = (type: PostType, slug: string) => {
    if (availablePostTypes.includes(type)) {
        if (type === "article") {
            return `/blog/${slug}`;
        } else {
            return `/portfolio/${slug}`;
        }
    } else {
        throw `${type} is not a supported post type`;
    }
}