import {CommonPostSchema} from "@/lib/posts";

export interface ArticlesSchema extends CommonPostSchema {
    tags?: string[]
    keywords: string[];
}
