import {getAllArticles} from "@/lib/articles";
import {PostCard} from "@/components/post-card";

const AllPosts = async () => {
    const lastPosts = await getAllArticles();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lastPosts.map(post =>
                (
                    <PostCard key={post.slug} type="article" title={post.title} slug={post.slug}
                              thumbnail={post.thumbnail} date={new Date(post.date).toDateString()}
                              description={post.description}
                              link={`/blog/${post.slug}`} tags={post.tags}/>
                ))}
        </div>
    );
};

export default AllPosts;
