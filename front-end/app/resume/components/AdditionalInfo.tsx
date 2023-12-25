import React from "react";

import CVSection from "./CVSection";
import data from "../data/data";

type Props = {
    records: typeof data.additionalInfo;
};

const AdditionalInfo = (props: Props) => (
    <CVSection title="Additional information" cls="more">
        <div className="base-list">
            {props.records.map(record => (
                <div key={record.name} className="cv-list-item w3-row w3-margin-bottom">
                    <div className="item-key w3-quarter">{record.name}</div>
                    <div className="item-value w3-threequarter">{record.description}</div>
                </div>
            ))}
        </div>
    </CVSection>
)

export default AdditionalInfo;
