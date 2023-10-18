import {getArticlesSlugs, getFullArticleContent} from "@/lib/articles";

export async function generateStaticParams() {
    const allSlugs = await getArticlesSlugs();
    return allSlugs.map(slug => ({slug}));
}

type StaticProps = {
    params: {
        slug: string;
    }
}

export default async function Post(props: StaticProps) {
    const post = await getFullArticleContent({slug: props.params.slug});

    return (
        <article className='prose prose-sm md:prose-base lg:prose-lg mx-auto p-4'>
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{__html: post.contentHtml}}/>
        </article>
    );
}
