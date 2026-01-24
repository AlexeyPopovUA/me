import Link from 'next/link';
import { getLastArticles } from '@/lib/articles';
import { ThumbnailImage } from '@/components/image/animated-image-loading/thumbnail-image';
import { getInsideImageURL } from '@/lib/image';
import { readBlurredImageSrcPair } from '@/lib/image-server';
import { BlogSection, BlogPostCard } from '@/components/blog-section';

const LatestArticles = async () => {
    const lastNArticles = await getLastArticles({ limit: 5 });

    const articlesWithImages = await Promise.all(
        lastNArticles.map(async (article) => {
            const { blurDataURL, ratio } = await readBlurredImageSrcPair({ src: article.thumbnail });
            const imageURL = getInsideImageURL({ src: article.thumbnail, width: 240, height: 240, quality: 90 });

            return {
                ...article,
                imageURL,
                blurDataURL,
                ratio,
            };
        }),
    );

    return (
        <BlogSection>
            {articlesWithImages.map((article, index) => (
                <BlogPostCard
                    key={article.slug}
                    title={article.title}
                    href={`/blog/${article.slug}`}
                    index={index}
                    image={
                        <ThumbnailImage
                            imageClassName="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            unoptimized={true}
                            src={article.imageURL}
                            blurDataURL={article.blurDataURL}
                            alt={article.title}
                            loading="lazy"
                            width={96}
                            height={64}
                        />
                    }
                />
            ))}
        </BlogSection>
    );
};

export default LatestArticles;
