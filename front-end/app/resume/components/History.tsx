import React from "react";
import moment from "moment";
import clsx from "clsx";

import CVSection from "./CVSection";
import data from "../data/data";
import Tag from "@/components/primitive/Tag";

type Props = {
    experience: typeof data.experience;
};

/**
 * Converts "moment" module duration object into the humanized string
 */
const getHumanizedDuration = (duration: moment.Duration) => {
    const years = duration.years();
    const months = duration.months();

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

    let totalDuration = moment.duration();
    for (let i = 0; i < historyDurations.length; i++) {
        totalDuration = totalDuration.add(historyDurations[i]);
    }

    return (
        <CVSection cls="history" title={`Work history (${getHumanizedDuration(totalDuration)})`}>
            {props.experience.map((item, index) => (
                <section key={`${item.company}-${item.title}`} className="history-section flex flex-col gap-2">
                    <h3 className="title">{item.title}</h3>
                    <div className="company-name font-bold">{item.company}</div>
                    <div
                        className="font-bold">{`${item.dateStart} - ${item.dateEnd ? item.dateEnd : "Now"} (${historyDurationValues[index]})`}</div>
                    {item.stack && <div
                        className="description flex flex-row flex-wrap gap-2">{item.stack.split(", ").map(item =>
                        <Tag key={item} item={item}/>)}</div>}
                    {Array.isArray(item.description) ? item.description.map((descr, i) => <div
                            key={descr.slice(0, 20)}
                            className={clsx("flex flex-col gap-2", {
                                "border-b": i !== item.description.length - 1
                            })}>{descr}</div>) :
                        <div className="description col-start-2 col-span-3 pb-2">{item.description}</div>}
                </section>
            ))}
        </CVSection>
    );
}

export default History;
