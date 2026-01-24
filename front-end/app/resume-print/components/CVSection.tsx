import React, {PropsWithChildren} from 'react';
import clsx from "clsx";

export type CVSectionProps =  PropsWithChildren<{
    title: string;
    cls: string;
}>;

const CVSection = (props: CVSectionProps) => (
    <div className={clsx("cv-section", props.cls)}>
        <h2 className="cv-section-title text-center print:mt-4 print:mb-2">{props.title}</h2>
        <div className="cv-section-content flex flex-col gap-2">{props.children}</div>
    </div>
);

export default CVSection;
