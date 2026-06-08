import {CommonPostSchema} from "@/lib/posts";

export interface ProjectsSchema extends CommonPostSchema {
    company?: string;
    type: "Employment" | "Freelance" | "Own project";
    gallery: string[];
    galleryAlt?: string[];
    technologies: string[];
    URL?: string;
    state?: string;
    featured?: boolean;
}
