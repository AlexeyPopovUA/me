import React from "react";
import clsx from "clsx";

import CVSection from "./CVSection";
import data from "../data/data";

type Props = {
    skills: typeof data.skills;
};

const Skills = (props: Props) => (
    <CVSection title="Skills" cls="skills pt-4">
        {props.skills.map((item) => (
            <div key={item.name} className="cv-list-item sm:grid sm:grid-cols-4 py-2">
                <div className="col-start-1 col-span-1 pr-4 mb-2 font-bold">{item.name}</div>
                {Array.isArray(item.description) ? item.description.map((descr, i) => <div
                        key={descr.slice(0, 20)}
                        className={clsx("description col-start-2 col-span-3", {
                            "border-b": i !== item.description.length - 1,
                            "pb-2": i === 0,
                            "py-2": i !== 0 && i !== item.description.length - 1,
                            "pt-2": i === item.description.length - 1
                        })}>{descr}</div>) :
                    <div className="description col-start-2 col-span-3">{item.description}</div>}
            </div>
        ))}
    </CVSection>
)

export default Skills;
