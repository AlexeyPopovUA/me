import Link from "next/link";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const LatestArticles = async () => {
    const baseArticleDir = "articles";
    const articleDirents = await fs.readdir(path.join(baseArticleDir), {withFileTypes: true, recursive: false});

    const articleDirs = articleDirents
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    const articleFiles = articleDirs.map(dir => path.join(baseArticleDir, dir, "article.mdx"));

    const articles = await Promise.all(
        articleFiles
            .map(async file => {
                const content = await fs.readFile(file);
                const {data: frontMatter} = matter(content);

                return {
                    meta: frontMatter,
                    slug: frontMatter.slug
                };
            })
    );

    const lastNArticles = articles.sort((a, b) =>  new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()).slice(0, 4);

    return (
        <>
            {lastNArticles.map(article => (
                <Link href={`/blog/${article.slug}`} passHref key={article.slug}>
                    <div className='py-2 flex justify-between align-middle gap-2'>
                        <div>
                            <h3 className="text-lg font-bold">{article.meta.title}</h3>
                            <p className="text-gray-400">{article.meta.description}</p>
                        </div>
                        <div className="my-auto text-gray-400">
                            <p>{article.meta.date}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </>
    );
};

export default LatestArticles;
