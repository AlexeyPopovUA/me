import React from "react";

import CVSection from "./CVSection";
import data from "../data/data";

type Props = {
    education: typeof data.education;
};

const Education = (props: Props) => (
    <CVSection title="Education" cls="history">
        {props.education.map((item) => (
            <div key={`${item.company}-${item.title}`} className="cv-list-item sm:grid sm:grid-cols-4 py-4">
                <div className="item-key pr-4 mb-2 font-bold">{item.date}</div>
                <div className="item-value col-span-3">
                    <div className="title underline mb-2 font-bold">{item.title}</div>
                    <div className="company-name mb-2 italic">{item.company}</div>
                    <div className="description mb-2">{item.description}</div>
                </div>
            </div>
        ))}
    </CVSection>
)

export default Education;
