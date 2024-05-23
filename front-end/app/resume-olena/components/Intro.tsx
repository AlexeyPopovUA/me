import React from "react";

import data from "../data/data";
import CVSection from "./CVSection";

type Props = {
    intro: typeof data.intro;
};

const Intro = (props: Props) => (
    <CVSection title={props.intro.title} cls="intro">
        {props.intro.description.map(item => <div key={item}>{item}</div>)}
    </CVSection>
);

export default Intro;
