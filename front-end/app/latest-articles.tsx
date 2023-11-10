import Link from "next/link";
import {getLastArticles} from "@/lib/articles";

const LatestArticles = async () => {
    const lastNArticles = await getLastArticles({limit: 5});

    return (
        <>
            {lastNArticles.map(article => (
                <Link href={`/blog/${article.slug}`} passHref key={article.slug}>
                    <div className='py-2 flex justify-between align-middle gap-2'>
                        <h3 className="text-lg font-bold">{article.title}</h3>
                    </div>
                </Link>
            ))}
        </>
    );
};

export default LatestArticles;
