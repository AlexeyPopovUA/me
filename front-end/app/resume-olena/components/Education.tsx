import React, {Fragment} from "react";

import CVSection from "./CVSection";
import data from "../data/data";

type Props = {
    education: typeof data.education;
};

const Education = (props: Props) => (
    <CVSection title="Education" cls="history">
        {props.education.map((item) => (
            <Fragment key={item.title}>
                <h3 className="title">{item.title}</h3>
                <div className="item-key pr-4">{item.date}</div>
                <div className="company-name italic">{item.company}</div>
                <div className="description">{item.description}</div>
            </Fragment>
        ))}
    </CVSection>
)

export default Education;
