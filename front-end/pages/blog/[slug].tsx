import {MDXRemote, MDXRemoteProps} from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import images from "remark-images";
import emoji from "remark-emoji";
import {MDXComponents} from "mdx/types";
import Head from 'next/head';

import {getArticlesSlugList, getPost} from "@/lib/articles";

const components: MDXComponents = {
    // @ts-ignore
    //img: ResponsiveImage
};

const options: MDXRemoteProps["options"] = {
    mdxOptions: {
        remarkPlugins: [remarkGfm, images, emoji],
        rehypePlugins: [],
    }
};

export async function getStaticPaths() {
    const paths = (await getArticlesSlugList()).map(slug => ({params: {slug}}));

    return {paths: paths, fallback: false};
}

type StaticProps = {
    params: {
        slug: string;
    }
}

export async function getStaticProps(props: StaticProps) {
    // Fetch necessary data for the blog post using params.slug
    const postData = await getPost(props.params);

    return {
        props: {
            postData
        }
    }
}

type PostProps = {
    postData: {
        title: string;
        slug: string;
        contentHtml: string;
    }
}

export default function Post(props: PostProps) {
    console.log(props);
    return (
        <>
            <Head>
                <title>{props.postData.title}</title>
            </Head>
            <article className='prose prose-sm md:prose-base lg:prose-lg mx-auto p-4'>
                <h1>{props.postData.title}</h1>

                <div dangerouslySetInnerHTML={{__html: props.postData.contentHtml}}/>
                {/* <><MDXRemote source={props.postData.content} options={options}/></>*/}
            </article>
        </>
    );
}
