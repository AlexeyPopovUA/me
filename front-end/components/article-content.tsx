import {getArticlePathByDirName} from "@/lib/files";
import {getArticleMdxDataByPath} from "@/lib/mdx-utils";

type Params = {
    slug: string;
}

export const ArticleContent = async (props: Params) => {
    const {content} = await getArticleMdxDataByPath({path: getArticlePathByDirName(props.slug)});
    return content;
};
