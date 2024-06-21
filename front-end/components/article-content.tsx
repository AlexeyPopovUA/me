import {getArticlePathByDirName} from "@/lib/files";
import {getMdxDataByPath} from "@/lib/mdx-utils";

type Params = {
    slug: string;
}

export const ArticleContent = async (props: Params) => {
    const {content} = await getMdxDataByPath({path: getArticlePathByDirName(props.slug)});
    return content;
};
