import {CommonPostSchema} from "@/lib/posts";

export interface ProjectsSchema extends CommonPostSchema {
    company: string;
    type: "employment" | "freelance" | "own";
    gallery: string[];
    technologies: string[];
    "my-commitment": string[];
    "main-features": string[];
    URL?: string;
}
