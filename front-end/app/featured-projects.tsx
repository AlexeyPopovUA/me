import Link from 'next/link';
import { getFeaturedProjects } from '@/lib/articles';
import { ThumbnailImage } from '@/components/image/animated-image-loading/thumbnail-image';
import { getInsideImageURL, readBlurredImageSrcPair } from '@/lib/image';

const FeaturedProjects = async () => {
    const featuredProjects = await getFeaturedProjects({ limit: 4 });

    const projectsWithImages = await Promise.all(
        featuredProjects.map(async (project) => {
            const { blurDataURL, ratio } = await readBlurredImageSrcPair({ src: project.thumbnail });
            const imageURL = getInsideImageURL({ src: project.thumbnail, width: 160, height: 160, quality: 90 });

            return {
                ...project,
                imageURL,
                blurDataURL,
                ratio,
            };
        }),
    );

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 justify-items-center">
                {projectsWithImages.map((project) => (
                    <Link key={project.slug} href={`/portfolio/${project.slug}`} passHref className="border-2 rounded-md hover:shadow-lg transition-shadow">
                        <ThumbnailImage
                            className="flex-shrink-0"
                            imageClassName="rounded-md object-cover"
                            unoptimized={true}
                            src={project.imageURL}
                            blurDataURL={project.blurDataURL}
                            alt={project.title}
                            loading="lazy"
                            width={160}
                            height={160 / project.ratio}
                        />
                    </Link>
                ))}
            </div>
            {/*<Link href="/portfolio" className="font-bold hover:text-amber-500">
                See more projects →
            </Link>*/}
        </>
    );
};

export default FeaturedProjects;
