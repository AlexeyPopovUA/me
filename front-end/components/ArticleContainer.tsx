import {PropsWithChildren} from "react";

export const ArticleContainer = (props: PropsWithChildren) => (
    <main className="min-h-screen bg-background">
        <article className='article-content px-4 py-8 pt-32'>
            {props.children}
        </article>
    </main>
);