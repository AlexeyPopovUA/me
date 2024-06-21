import {getPagePathByDirName} from "@/lib/files";
import {getMdxDataByPath} from "@/lib/mdx-utils";

type Params = {
    slug: string;
}

export const PageContent = async (props: Params) => {
    const mdxData = await getMdxDataByPath({path: getPagePathByDirName(props.slug)});
    return mdxData.content;
};
