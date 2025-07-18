import {getAllProjects} from "@/lib/articles";
import {PostCard} from "@/components/post-card";

const AllProjects = async () => {
    const lastPosts = await getAllProjects();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lastPosts.map(post =>
                (
                    <PostCard key={post.slug} type="project" title={post.title} slug={post.slug}
                              thumbnail={post.thumbnail} description={post.description}
                              link={`/portfolio/${post.slug}`} tags={post.technologies}
                              projectType={post.type}/>
                ))}
        </div>
    );
};

export default AllProjects;
