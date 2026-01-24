import Link from 'next/link';
import { getFeaturedProjects } from '@/lib/articles';
import { ThumbnailImage } from '@/components/image/animated-image-loading/thumbnail-image';
import { getInsideImageURL } from '@/lib/image';
import { readBlurredImageSrcPair } from '@/lib/image-server';
import { PortfolioSection, ProjectCard } from '@/components/portfolio-section';

const FeaturedProjects = async () => {
    const featuredProjects = await getFeaturedProjects({ limit: 4 });

    const projectsWithImages = await Promise.all(
        featuredProjects.map(async (project) => {
            const { blurDataURL, ratio } = await readBlurredImageSrcPair({ src: project.thumbnail });
            const imageURL = getInsideImageURL({ src: project.thumbnail, width: 384, height: 384, quality: 90 });

            return {
                ...project,
                imageURL,
                blurDataURL,
                ratio,
            };
        }),
    );

    return (
        <PortfolioSection>
            {projectsWithImages.map((project, index) => (
                <ProjectCard
                    key={project.slug}
                    title={project.title}
                    href={`/portfolio/${project.slug}`}
                    index={index}
                    image={
                        <ThumbnailImage
                            imageClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            unoptimized={true}
                            src={project.imageURL}
                            blurDataURL={project.blurDataURL}
                            alt={project.title}
                            loading="lazy"
                            width={384}
                            height={384}
                        />
                    }
                />
            ))}
        </PortfolioSection>
    );
};

export default FeaturedProjects;
