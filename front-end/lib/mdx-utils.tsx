import MDXImage from "@/components/image/mdx-image";
import {PluggableList} from "unified";
import {remarkMermaid} from "@/lib/RemarkMermaidPlugin";
import emoji from "remark-emoji";
import remarkUnwrapImages from "remark-unwrap-images";
import {remarkCode} from "@/lib/RemarkCodeHighlightingPlugin";
import rehypeRaw from "rehype-raw";
import {compileMDX, MDXRemoteProps} from "next-mdx-remote/rsc";
import {read} from "to-vfile";
import remarkGfm from 'remark-gfm'

const cmp = {
    // Note, that MDXImage is a server component, therefore wrapped to match types
    img: (props: any) => <MDXImage {...props} />,
    table: (props: any) => <div className="table-wrapper"><table {...props} /></div>
};

const mdPlugins: PluggableList = [
    [remarkMermaid],
    [emoji, {accessible: true, emoticon: false}],
    [remarkUnwrapImages],
    [remarkCode],
    [remarkGfm]
];
const rhPlugins: PluggableList = [
    [rehypeRaw, {passThrough: ['mdxJsxTextElement', 'mdxJsxFlowElement'], allowDangerousHtml: true}],
];

const options: MDXRemoteProps["options"] = {
    parseFrontmatter: true,
    mdxOptions: {
        rehypePlugins: rhPlugins,
        remarkPlugins: mdPlugins,
    }
}

export const getMdxDataByPath = async ({path}: { path: string }) => {
    const source = await read(path);
    return compileMDX({source, options, components: cmp});
}