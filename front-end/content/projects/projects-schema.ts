export interface ProjectsSchema {
    title: string;
    slug: string;
    date: string;
    draft?: boolean;
    description: string;
    thumbnail: string;

    company: string;
    type: "employment" | "freelance" | "own";
    gallery: string[];
    technologies: string[];
    "my-commitment": string[];
    "main-features": string[];
    URL?: string;
}
