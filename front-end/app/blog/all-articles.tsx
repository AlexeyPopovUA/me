import Link from "next/link";
import {getAllArticles} from "@/lib/articles";
import BlogThumbnailImage from "@/app/blog/blog-thumbnail-image";

const AllArticles = async () => {
    const lastNArticles = await getAllArticles();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
            {lastNArticles.map(article => (
                <Link className="hover:text-amber-600" href={`/blog/${article.slug}`} passHref
                      key={article.slug}>
                    <div
                        className="flex flex-col items-stretch pb-4 border-b-2 border-solid border-gray-200 hover:text-amber-600"
                        key={article.slug}>
                        {article.thumbnail ?
                            <div className="flex flex-row mb-4"><BlogThumbnailImage src={article.thumbnail}
                                                                                    alt={"test"}/></div> : null}
                        <div className="font-bold text-xl underline mb-2">{article.title}</div>
                        <div className="text-sm text-gray-600 mb-4">{article.date}</div>
                        <div className="text-md text-gray-600">{article.description}</div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default AllArticles;
