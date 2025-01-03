import {getPagePathByDirName} from "@/lib/files";
import {getPageMdxDataByPath} from "@/lib/mdx-utils";

type Params = {
  slug: string;
}

export const PageContent = async (props: Params) => {
  const mdxData = await getPageMdxDataByPath({path: getPagePathByDirName(props.slug)});
  return mdxData.content;
};
