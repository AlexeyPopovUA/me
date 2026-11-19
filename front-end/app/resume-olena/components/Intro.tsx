import React from "react";

import data from "../data/data";
import CVSection from "./CVSection";

type Props = {
    intro: typeof data.intro;
};

const Intro = (props: Props) => (
    <CVSection title={props.intro.title} cls="intro">
        <div className="flex flex-col gap-2 print:gap-1">
            {props.intro.description.map((item) => (
                <div key={item.slice(0, 20)} className="description">
                    {item}
                </div>
            ))}
        </div>
    </CVSection>
);

export default Intro;
