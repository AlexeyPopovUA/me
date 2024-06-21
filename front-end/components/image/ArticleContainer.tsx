import {PropsWithChildren} from "react";

export const ArticleContainer = (props: PropsWithChildren) => (
    <article
        className='prose prose-sm md:prose-base lg:prose-lg prose-pre:bg-white prose-pre:p-0 mx-auto p-4'>
        {props.children}
    </article>
);