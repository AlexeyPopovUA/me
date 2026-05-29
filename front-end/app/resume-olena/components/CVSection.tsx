import React, {PropsWithChildren} from 'react';
import clsx from "clsx";

export type CVSectionProps =  PropsWithChildren<{
    title: string;
    cls: string;
}>;

const CVSection = (props: CVSectionProps) => (
    <div className={clsx("cv-section", props.cls)}>
        <h2 className="cv-section-title text-center print:mt-2 print:mb-1">{props.title}</h2>
        <div className="cv-section-content flex flex-col gap-2 print:gap-1">{props.children}</div>
    </div>
);

export default CVSection;
