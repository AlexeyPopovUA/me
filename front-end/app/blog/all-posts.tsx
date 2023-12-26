import Link from "next/link";
import {getAllPostsByType} from "@/lib/articles";
import ThumbnailImage from "@/app/blog/thumbnail-image";
import {PostType} from "@/lib/posts";

const AllPosts = async (props: {type: PostType}) => {
    const lastPosts = await getAllPostsByType({type: props.type});

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
            {lastPosts.map(post => (
                <Link className="hover:text-amber-600" href={`/blog/${post.slug}`} passHref
                      key={post.slug}>
                    <div className="flex flex-col items-stretch pb-4 hover:text-amber-600">
                        {post.thumbnail ?
                            <div className="flex flex-row mb-4">
                                <ThumbnailImage src={post.thumbnail} alt={post.title}/>
                            </div> : null}
                        <div className="font-bold text-xl underline mb-2">{post.title}</div>
                        <div className="text-sm text-gray-600 mb-4">{post.date}</div>
                        <div className="text-md text-gray-600">{post.description}</div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default AllPosts;
