import React from "react";
import clsx from "clsx";

type Props = {
    item: React.ReactNode;
    className?: string;
};

const Tag = ({item, className}: Props) => (
    <span className={clsx("py-0 px-1 rounded-md bg-slate-100 text-nowrap text-md", className)}>
        {item}
    </span>
);

export default Tag;
