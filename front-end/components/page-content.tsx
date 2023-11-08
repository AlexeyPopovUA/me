import React, {PropsWithChildren} from "react";
import Markdown from "react-markdown";
import emoji from "remark-emoji";
import {PluggableList} from "unified";

import MDXImage from "@/components/image/mdx-image";

const mdPlugins: PluggableList = [
    [emoji, {accessible: true, emoticon: false}]
];

const cmp = {
    img: MDXImage
};

export const PageContent = (props: PropsWithChildren<any>) => <Markdown remarkPlugins={mdPlugins}
                                                                        components={cmp}>{props.children}</Markdown>;
