import React, {PropsWithChildren} from 'react';

export type CVSectionProps =  PropsWithChildren<{
    title: string;
    cls: string;
}>;

const CVSection = (props: CVSectionProps) => (
    <div className={`cv-section ${props.cls}`}>
        <h2 className="cv-section-title py-2 text-center text-lg font-bold">{props.title}</h2>
        <div className="cv-section-content container">{props.children}</div>
    </div>
);

export default CVSection;
