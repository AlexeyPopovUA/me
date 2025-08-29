import React from "react";
import clsx from "clsx";

import data from "../data/data";
import CVSection from "./CVSection";

type Props = {
    intro: typeof data.intro;
};

const Intro = (props: Props) => (
    <CVSection title={props.intro.title} cls="intro">
        {props.intro.description.map((item, i, arr) => <div
            key={item.slice(0, 20)}
            className={clsx("description", {
                "border-b print:border-b-0": i !== arr.length - 1
            })}>{item}</div>)}
    </CVSection>
);

export default Intro;