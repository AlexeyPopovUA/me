import { getAllProjects } from '@/lib/articles';
import { PostCard } from '@/components/post-card-new';

type AllProjectsProps = {
    projects?: Awaited<ReturnType<typeof getAllProjects>>;
};

const AllProjects = async ({projects}: AllProjectsProps = {}) => {
    const lastPosts = projects ?? await getAllProjects();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {lastPosts.map((post, index) => (
                <PostCard
                    key={post.slug}
                    type="project"
                    title={post.title}
                    slug={post.slug}
                    thumbnail={post.thumbnail}
                    description={post.description}
                    link={`/portfolio/${post.slug}`}
                    tags={post.technologies}
                    projectType={post.type}
                    index={index}
                />
            ))}
        </div>
    );
};

export default AllProjects;
