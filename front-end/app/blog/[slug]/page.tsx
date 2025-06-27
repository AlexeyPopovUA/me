import React from 'react';
import { Metadata } from 'next';

import { getArticleSEOContent, getArticlesSlugs } from '@/lib/articles';
import GoTop from '@/components/ScrollUpButton';
import { content } from '@/app/configuration/content';
import { getOGImageURL } from '@/lib/image';
import { ArticleContainer } from '@/components/ArticleContainer';
import { environment } from '@/app/configuration/environment';
import { ensurePathSlash } from '@/lib/utils';
import { getArticleMdxDataByPath } from '@/lib/mdx-utils';
import { getArticlePathByDirName } from '@/lib/files';
import { readTOC } from '@/lib/toc-parser';
import { getRssMetadataObject } from '@/lib/rss';
import TableOfContents from '@/components/TableOfContents';
import { BlogPostStructuredData } from '@/components/BlogPostStructuredData';

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
    const post = await getArticleSEOContent({ slug: (await props.params).slug });
    const ogImage = getOGImageURL({ src: post.thumbnail });

    return {
        title: `${post.title} - ${content.authorName}`,
        description: post.description,
        metadataBase: new URL(environment.url),
        alternates: {
            canonical: ensurePathSlash(`/blog/${(await props.params).slug}`),
            types: getRssMetadataObject(),
        },
        keywords: post.keywords,
        openGraph: {
            title: getSEOTitleName(post.title),
            description: post.description,
            images: [ogImage],
        },
    };
};

export default async function Post(props: StaticProps) {
    const slug = (await props.params).slug;
    const path = getArticlePathByDirName(slug);

    // TODO Avoid double file reading
    const { content, frontmatter } = await getArticleMdxDataByPath({ path });
    const toc = await readTOC({ path });
    // Build canonical URL
    const url = ensurePathSlash(`${environment.url}/blog/${slug}`);
    // Use post.thumbnail for image if available
    const image = frontmatter.thumbnail ? getOGImageURL({ src: frontmatter.thumbnail }) : undefined;

    return (
        <>
            <BlogPostStructuredData
                title={getSEOTitleName(frontmatter.title)}
                description={frontmatter.description}
                datePublished={frontmatter.date}
                dateModified={frontmatter.lastMod || frontmatter.date}
                author={frontmatter.author}
                url={url}
                image={image}
            />
            <ArticleContainer>
                {content}

                <GoTop cls={"fixed xl:hidden"} />

                {/* Fixed sidebar TOC */}
                <div className="fixed top-24 left-4 hidden w-60 xl:block">
                    <TableOfContents heading={toc!} className="rounded-lg bg-slate-50 p-4" />
                </div>

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
