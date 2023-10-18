import Link from "next/link";
import {getLastArticles} from "@/lib/articles";

const LatestArticles = async () => {
    const lastNArticles = await getLastArticles({limit: 5});

    return (
        <>
            {lastNArticles.map(article => (
                <Link href={`/blog/${article.slug}`} passHref key={article.slug}>
                    <div className='py-2 flex justify-between align-middle gap-2'>
                        <div>
                            <h3 className="text-lg font-bold">{article.title}</h3>
                            <p className="text-gray-400">{article.description}</p>
                        </div>
                        <div className="my-auto text-gray-400">
                            <p>{article.date}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </>
    );
};

export default LatestArticles;
