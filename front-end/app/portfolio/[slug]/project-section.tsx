import React, {PropsWithChildren} from "react";

type Props = PropsWithChildren<{
    headerText: string;
}>;

export const ProjectSection = (props: Props) => (<div>
    <h3>{props.headerText}</h3>
    {props.children}
</div>);
