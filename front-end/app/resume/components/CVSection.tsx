import React, {PropsWithChildren} from 'react';

export type CVSectionProps =  PropsWithChildren<{
    title: string;
    cls: string;
}>;

const CVSection = (props: CVSectionProps) => (
    <div className="cv-section">
        <h2 className="cv-section-title text-center">{props.title}</h2>
        <div className="cv-section-content flex flex-col gap-2">{props.children}</div>
    </div>
);

export default CVSection;
