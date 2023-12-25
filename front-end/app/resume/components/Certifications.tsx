import React from 'react';

import "./../../styles/components/Certificates.scss";
import CVSection from "./CVSection";
import data from "../data/data";

type Props = {
    certificates: typeof data.certificates;
};

const Certifications = (props: Props) => (
    <CVSection title="Certifications" cls="certificates">
        <div className="base-list">
            {props.certificates.map((item) => (
                <div key={item.title} className="cv-list-item w3-row w3-margin-bottom">
                    <div className="item-key w3-quarter">{item.date}</div>
                    <div className="item-value w3-threequarter">
                        <div className="title">
                            <a href={item.link}>{item.title}</a>
                        </div>
                        <div className="company-name">{item.company}</div>
                    </div>
                </div>
            ))}
        </div>
    </CVSection>
);

export default Certifications;
