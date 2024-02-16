import React, {PropsWithChildren} from "react";
import Markdown from "react-markdown";
import emoji from "remark-emoji";
import {PluggableList} from "unified";

import MDXImage from "@/components/image/mdx-image";

const mdPlugins: PluggableList = [
    [emoji, {accessible: true, emoticon: false}]
];

const cmp = {
    // Note, that MDXImage is a server component, therefore wrapped to match types
    img: (props: any) => <MDXImage {...props} />
};

export const PageContent = (props: PropsWithChildren<any>) => <Markdown remarkPlugins={mdPlugins}
                                                                        components={cmp}>{props.children}</Markdown>;
