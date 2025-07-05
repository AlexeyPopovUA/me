import {CommonPostSchema} from "@/lib/posts";

export interface ProjectsSchema extends CommonPostSchema {
    company?: string;
    type: "Employment" | "Freelance" | "Own project";
    gallery: string[];
    URL?: string;
    state?: string;
}
