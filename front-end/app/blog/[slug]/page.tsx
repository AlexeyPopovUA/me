import {getArticlesSlugList, getPost, getPostData} from "@/lib/articles";

export async function generateStaticParams() {
    const slugList = await getArticlesSlugList();
    return Promise.all(slugList.map(slug => getPostData({slug})));
}

type StaticProps = {
    params: {
        slug: string;
    }
}

export default async function Post(props: StaticProps) {
    //console.log("Post props", props);

    const post = await getPost({slug: props.params.slug});

    //console.log("Post data", post);

    return (
        <article className='prose prose-sm md:prose-base lg:prose-lg mx-auto p-4'>
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{__html: post.contentHtml}}/>
        </article>
    );
}
