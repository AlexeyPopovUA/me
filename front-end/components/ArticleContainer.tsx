import {PropsWithChildren} from "react";

export const ArticleContainer = (props: PropsWithChildren) => (
    <main className="min-h-screen bg-background">
        <article
            className='prose prose-sm md:prose-base lg:prose-lg dark:prose-invert prose-pre:bg-slate-50 dark:prose-pre:bg-slate-900 prose-pre:p-0 prose-headings:scroll-mt-24 container mx-auto px-4 py-8 pt-32'>
            {props.children}
        </article>
    </main>
);