import React, {Fragment} from "react";
import clsx from "clsx";

import CVSection from "./CVSection";
import data from "../data/data";

type Props = {
    skills: typeof data.skills;
};

const Skills = (props: Props) => (
    <CVSection title="Skills" cls="skills">
        {props.skills.map((item) => (
            <Fragment key={item.name}>
                <h3>{item.name}</h3>
                {Array.isArray(item.description) ? item.description.map((descr, i) => <div
                        key={descr.slice(0, 20)}
                        className={clsx("description", {
                            "border-b": i !== item.description.length - 1
                        })}>{descr}</div>) :
                    <div className="description">{item.description}</div>}
            </Fragment>
        ))}
    </CVSection>
)

export default Skills;
