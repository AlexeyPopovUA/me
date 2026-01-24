import React, {Fragment} from "react";
import clsx from "clsx";

import CVSection from "./CVSection";
import data from "../data/data";

type Props = {
    skills: typeof data.skills;
};

const Skills = (props: Props) => (
    <CVSection title="Skills" cls="skills print:break-after-page">
        {props.skills.map((item) => (
            <Fragment key={item.name}>
                <h3 className="print:mb-1 print:mt-2">{item.name}</h3>
                {Array.isArray(item.description) ? item.description.map((descr, i) => <div
                        key={descr.slice(0, 20)}
                        className={clsx("description print:mb-1", {
                            "border-b print:border-b-0": i !== item.description.length - 1
                        })}>{descr}</div>) :
                    <div className="description print:mb-1">{item.description}</div>}
            </Fragment>
        ))}
    </CVSection>
)

export default Skills;
