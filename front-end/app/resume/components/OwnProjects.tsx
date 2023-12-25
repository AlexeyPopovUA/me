import React from "react";

import data from "../data/data";
import CVSection from "./CVSection";

type Props = {
    projects: typeof data.ownProjects;
};

const OwnProjects = (props: Props) => (
    <CVSection title="Own projects" cls="own-projects">
        {props.projects.map((project) => (
            <>
                <h3>{project.name}</h3>
                {project.links.map((link) => (
                    <div key={link.name} className="link">
                        <span className="font-bold">{link.name}</span>: <a href={link.link}
                                                                           className="underline">{link.link}</a>
                    </div>
                ))}
                <div className="description">{project.description}</div>
            </>
        ))}
    </CVSection>
);

export default OwnProjects;
