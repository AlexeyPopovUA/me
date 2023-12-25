import React from "react";
import moment from "moment";
import clsx from "clsx";

import CVSection from "./CVSection";
import data from "../data/data";

type Props = {
    experience: typeof data.experience;
};

/**
 * Converts "moment" module duration object into the humanized string
 */
const getHumanizedDuration = (duration: moment.Duration) => {
    const years = duration.years();
    let months = duration.months();
    const days = duration.days();

    //correction takes days into account
    if (days / 31 > 0.75) {
        duration.add(1, "month");
        duration.subtract(days, "day");
        months = duration.months();
    }

    //formatted output
    const result = [];
    if (years > 0) {
        result.push(years === 1 ? `${years} year` : `${years} years`);
    }
    if (months > 0) {
        result.push(months === 1 ? `${months} month` : `${months} months`);
    }
    return result.join(" ");
}

const History = (props: Props) => {
    const historyDurations = props.experience.map((item) =>
        moment.duration(
            (item.dateEnd ? moment(item.dateEnd, "MMM YYYY", "en") : moment()).diff(
                moment(item.dateStart, "MMM YYYY", "en")
            )
        )
    );
    const historyDurationValues = historyDurations.map((duration) => getHumanizedDuration(duration));

    let totalDuration = historyDurations[0];
    for (let i = 1; i < historyDurations.length - 1; i++) {
        totalDuration = totalDuration.add(historyDurations[i]);
    }

    return (
        <CVSection cls="history" title={`Work history (${getHumanizedDuration(totalDuration)})`}>
            {props.experience.map((item, index) => (
                <section key={`${item.company}-${item.title}`} className={clsx("history-section", {
                    "pb-4": index !== props.experience.length - 1
                })}>
                    <div className="cv-list-item sm:grid sm:grid-cols-4 py-2">
                        <div className="item-key pr-4 pb-2">
                            <div
                                className="font-bold">{`${item.dateStart} - ${item.dateEnd ? item.dateEnd : "Now"}`}</div>
                            <div>({historyDurationValues[index]})</div>
                        </div>
                        <div className="item-value col-start-2 col-span-3">
                            <div className="title underline font-bold">{item.title}</div>
                            <div className="company-name">{item.company}</div>
                        </div>
                        {item.stack && <div
                            className="description col-start-2 col-span-3 bg-slate-100 py-2 pr-2 italic">{item.stack}</div>}
                    </div>
                    <div className="cv-list-item sm:grid sm:grid-cols-4">
                        {Array.isArray(item.description) ? item.description.map((descr, i) => <div
                                key={descr.slice(0, 20)}
                                className={clsx("description col-start-2 col-span-3", {
                                    "border-b": i !== item.description.length - 1,
                                    "pb-2": i === 0,
                                    "py-2": i !== 0
                                })}>{descr}</div>) :
                            <div className="description col-start-2 col-span-3 pb-2">{item.description}</div>}
                    </div>
                </section>
            ))}
        </CVSection>
    );
}

export default History;
