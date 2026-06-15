import React from 'react';
import { Metadata } from 'next';

import { getArticleSEOContent, getArticlePathBySlug, getArticlesSlugs } from '@/lib/articles';
import { DraftPreviewBanner } from '@/components/DraftPreviewBanner';
import { ArticleMobileControls } from '@/components/ArticleMobileControls';
import { content } from '@/app/configuration/content';
import { getOGImageURL } from '@/lib/image';
import { getTwitterMetadata } from '@/lib/metadata';
import { ArticleContainer } from '@/components/ArticleContainer';
import { environment } from '@/app/configuration/environment';
import { ensurePathSlash } from '@/lib/utils';
import { extractArticleImageRefs, THUMBNAIL_ANCHOR_ID } from '@/lib/content-images';
import { getArticleMdxDataByPath } from '@/lib/mdx-utils';
import { readMdxBodyByPath } from '@/lib/mdx-source';
import { readArticleHeadings } from '@/lib/toc-parser';
import { getRssMetadataObject } from '@/lib/rss';
import TableOfContents from '@/components/TableOfContents';
import { BlogPostStructuredData } from '@/components/BlogPostStructuredData';
import { GiscusComments } from '@/components/GiscusComments';

export async function generateStaticParams() {
    const allSlugs = await getArticlesSlugs();
    return allSlugs.map((slug) => ({ slug }));
}

type StaticParams = Awaited<ReturnType<typeof generateStaticParams>>[number];
type StaticProps = {
    params: Promise<StaticParams>;
};

function getSEOTitleName(title: string) {
    return `${title} - ${content.authorName}`;
}

export const generateMetadata = async (props: StaticProps): Promise<Metadata> => {
    const slug = (await props.params).slug;
    const post = await getArticleSEOContent({ slug });
    const ogImage = getOGImageURL({ src: post.thumbnail });

    return {
        title: `${post.title} - ${content.authorName}`,
        description: post.description,
        metadataBase: new URL(environment.url),
        alternates: {
            canonical: ensurePathSlash(`/blog/${slug}`),
            types: getRssMetadataObject(),
        },
        keywords: post.keywords,
        robots: post.draft
            ? { index: false, follow: false }
            : {
                  index: true,
                  follow: true,
                  googleBot: {
                      index: true,
                      follow: true,
                      'max-image-preview': 'large' as const,
                      'max-snippet': -1,
                      'max-video-preview': -1,
                  },
              },
        openGraph: {
            title: getSEOTitleName(post.title),
            description: post.description,
            url: ensurePathSlash(`/blog/${slug}`),
            type: "article",
            images: [ogImage],
        },
        twitter: getTwitterMetadata({
            title: getSEOTitleName(post.title),
            description: post.description,
            images: [ogImage],
        }),
    };
};

export default async function Post(props: StaticProps) {
    const slug = (await props.params).slug;
    const path = await getArticlePathBySlug(slug);

    const [{ content, frontmatter }, body, { hasH1, tocRoot: toc }] = await Promise.all([
        getArticleMdxDataByPath({ path }),
        readMdxBodyByPath(path),
        readArticleHeadings({ path }),
    ]);
    const url = ensurePathSlash(`${environment.url}/blog/${slug}`);
    const imageRefs = extractArticleImageRefs(body, {
        thumbnail: frontmatter.thumbnail,
        thumbnailAlt: frontmatter.title,
    });

    return (
        <>
            <BlogPostStructuredData
                title={getSEOTitleName(frontmatter.title)}
                description={frontmatter.description}
                datePublished={frontmatter.date}
                dateModified={frontmatter.lastMod || frontmatter.date}
                author={frontmatter.author}
                url={url}
                imageRefs={imageRefs}
            />
            <ArticleContainer>
                {imageRefs.some((image) => image.anchorId === THUMBNAIL_ANCHOR_ID) ? (
                    <span id={THUMBNAIL_ANCHOR_ID} className="sr-only" aria-hidden="true" />
                ) : null}
                {frontmatter.draft ? <DraftPreviewBanner /> : null}
                {!hasH1 ? <h1>{frontmatter.title}</h1> : null}
                {content}

                {!frontmatter.draft ? (
                    <section className="mt-12 border-t border-border pt-8">
                        <h2 className="mb-4 text-xl font-semibold">Comments</h2>
                        <GiscusComments />
                    </section>
                ) : null}

                <ArticleMobileControls className="fixed xl:hidden" toc={toc} />

                {/* Fixed sidebar TOC */}
                {toc ? (
                    <div className="fixed top-24 left-4 hidden w-56 xl:block">
                        <TableOfContents heading={toc} className="rounded-xl bg-card border border-border p-5" />
                    </div>
                ) : null}

                {/* Mobile/responsive TOC */}
                {/*<div className="lg:hidden mb-8">
                  <TableOfContents
                    heading={toc!}
                    className="bg-gray-50 p-4 rounded-lg"
                  />
                </div>*/}
            </ArticleContainer>
        </>
    );
}
