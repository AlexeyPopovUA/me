import Link from "next/link";
import {getAllArticles} from "@/lib/articles";
import BlogThumbnailImage from "@/app/blog/blog-thumbnail-image";

const AllArticles = async () => {
    const lastNArticles = await getAllArticles();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
            {lastNArticles.map(article => (
                <div className="flex flex-col items-stretch pb-4 border-b-2 border-solid border-gray-200" key={article.slug}>
                    {article.thumbnail ? <div className="flex flex-row"><BlogThumbnailImage src={article.thumbnail} alt={"test"}/></div> : null}
                    <Link className="hover:text-amber-600 font-bold text-xl underline mb-2" href={`/blog/${article.slug}`} passHref
                          key={article.slug}>{article.title}</Link>
                    <div className="text-sm mb-4">{article.date}</div>
                    <div className="text-md text-gray-600">{article.description}</div>
                </div>
            ))}
        </div>
    );
};

export default AllArticles;
