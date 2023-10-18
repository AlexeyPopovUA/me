export interface ArticlesSchema {
    title: string;
    slug: string;
    date: string;
    draft?: boolean;
    description: string;
}