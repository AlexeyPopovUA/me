import Link from 'next/link';
import { getLastArticles } from '@/lib/articles';
import { ThumbnailImage } from '@/components/image/animated-image-loading/thumbnail-image';
import { getInsideImageURL, readBlurredImageSrcPair } from '@/lib/image';

const LatestArticles = async () => {
    const lastNArticles = await getLastArticles({ limit: 5 });

    const articlesWithImages = await Promise.all(
        lastNArticles.map(async (article) => {
            const { blurDataURL, ratio } = await readBlurredImageSrcPair({ src: article.thumbnail });
            const imageURL = getInsideImageURL({ src: article.thumbnail, width: 160, height: 160, quality: 90 });

            return {
                ...article,
                imageURL,
                blurDataURL,
                ratio,
            };
        }),
    );

    return (
        <>
            <div className="list-none">
                {articlesWithImages.map((article) => (
                    <div className="font-bold underline" key={article.slug}>
                        <Link href={`/blog/${article.slug}`} passHref className="flex items-center gap-3 py-4">
                            <ThumbnailImage
                                className="flex-shrink-0"
                                imageClassName="rounded-md object-cover"
                                unoptimized={true}
                                src={article.imageURL}
                                blurDataURL={article.blurDataURL}
                                alt={article.title}
                                loading="lazy"
                                width={160}
                                height={160 / article.ratio}
                            />
                            <span>{article.title}</span>
                        </Link>
                    </div>
                ))}
            </div>
            <Link href="/blog" className="font-bold hover:text-amber-500">
                See more articles →
            </Link>
        </>
    );
};

export default LatestArticles;
