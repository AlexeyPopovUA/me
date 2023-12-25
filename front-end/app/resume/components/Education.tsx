import React from "react";

import CVSection from "./CVSection";
import data from "../data/data";

type Props = {
    education: typeof data.education;
};

const Education = (props: Props) => (
    <CVSection title="Education" cls="history">
        {props.education.map((item) => (
            <>
                <h3 className="title">{item.title}</h3>
                <div className="item-key pr-4 mb-2">{item.date}</div>
                <div className="company-name mb-2 italic">{item.company}</div>
                <div className="description">{item.description}</div>
            </>
        ))}
    </CVSection>
)

export default Education;
