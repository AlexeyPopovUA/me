import React, {Fragment} from "react";
import clsx from "clsx";

import CVSection from "./CVSection";
import data from "../data/data";

type Props = {
    skills: typeof data.skills;
};

const Skills = (props: Props) => (
    <CVSection title="Skills" cls="skills print:text-[0.8rem] print:leading-snug">
        {props.skills.map((item) => (
            <Fragment key={item.name}>
                <h3 className="print:mb-0 print:mt-0 print:text-sm print:leading-tight">{item.name}</h3>
                {Array.isArray(item.description) ? item.description.map((descr, i) => <div
                        key={descr.slice(0, 20)}
                        className={clsx("description print:mb-0 print:leading-snug", {
                            "border-b print:border-b-0": i !== item.description.length - 1
                        })}>{descr}</div>) :
                    <div className="description print:mb-0 print:leading-snug">{item.description}</div>}
            </Fragment>
        ))}
    </CVSection>
)

export default Skills;
