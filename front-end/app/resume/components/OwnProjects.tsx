import React from "react";

import data from "../data/data";
import CVSection from "./CVSection";

type Props = {
    projects: typeof data.ownProjects;
};

const OwnProjects = (props: Props) => (
    <CVSection title="Own projects" cls="own-projects">
        {props.projects.map((project) => (
            <div key={project.name} className="cv-list-item sm:grid sm:grid-cols-4 py-2">
                <div className="item-key pr-4 mb-2 font-bold">{project.name}</div>
                <div className="item-value col-span-3">
                    {project.links.map((link) => (
                        <div key={link.name} className="link mb-2">
                                    <span>
                                        <span className="font-bold">{link.name}</span>: <a href={link.link}
                                                                                           className="underline">{link.link}</a>
                                    </span>
                        </div>
                    ))}
                    <div className="description">{project.description}</div>
                </div>
            </div>
        ))}
    </CVSection>
);

export default OwnProjects;
