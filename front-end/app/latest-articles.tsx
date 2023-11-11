import Link from "next/link";
import {getLastArticles} from "@/lib/articles";

const LatestArticles = async () => {
    const lastNArticles = await getLastArticles({limit: 5});

    return (
        <ul className="list-disc">
            {lastNArticles.map(article => (
                <li className='font-bold underline' key={article.slug}>
                    <Link href={`/blog/${article.slug}`} passHref key={article.slug}>{article.title}</Link>
                </li>
            ))}
        </ul>
    );
};

export default LatestArticles;
