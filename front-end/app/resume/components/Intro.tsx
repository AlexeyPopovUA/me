import React from "react";

import data from "../data/data";
import CVSection from "./CVSection";

type Props = {
    intro: typeof data.intro;
};

const Intro = (props: Props) => (
    <CVSection title={props.intro.title} cls="intro">
        <div className="py-4">
            {props.intro.description.map(item => <p className="pb-2" key={item}>{item}</p>)}
        </div>
    </CVSection>
);

export default Intro;
