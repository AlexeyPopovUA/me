import React from 'react';
import moment from 'moment';

import CVSection from './CVSection';
import data from '../data/data';
import Tag from '@/components/primitive/Tag';
import { Description } from './Description';

function getHumanizedDuration(duration: moment.Duration) {
    const years = duration.years();
    const months = duration.months();

    const result = [];
    if (years > 0) {
        result.push(years === 1 ? `${years} year` : `${years} years`);
    }
    if (months > 0) {
        result.push(months === 1 ? `${months} month` : `${months} months`);
    }
    return result.join(' ');
}

function Stack(props: { stack: string }) {
    return (
        <div className="description flex flex-row flex-wrap gap-2 print:gap-1">
            {props.stack.split(', ').map((item) => (
                <Tag key={item} item={item} className="resume-tag" />
            ))}
        </div>
    );
}

export function WorkHistory(props: { experience: typeof data.experience }) {
    const historyDurations = props.experience.map((item) =>
        moment.duration((item.dateEnd ? moment(item.dateEnd, 'MMM YYYY', 'en') : moment()).diff(moment(item.dateStart, 'MMM YYYY', 'en'))),
    );
    const historyDurationValues = historyDurations.map((duration) => getHumanizedDuration(duration));

    let totalDuration = moment.duration();
    for (let i = 0; i < historyDurations.length; i++) {
        totalDuration = totalDuration.add(historyDurations[i]);
    }

    return (
        <CVSection cls="history" title={`Work history (${getHumanizedDuration(totalDuration)})`}>
            {props.experience.map((item, index) => (
                <section
                    key={`${item.company}-${item.company}`}
                    className="history-section flex flex-col gap-2 print:gap-1 mt-4 first:mt-0 print:mt-2 print:first:mt-0"
                >
                    <h3 className="company-name font-bold">{item.company}</h3>
                    <div className="font-bold">{`${item.dateStart} - ${item.dateEnd ? item.dateEnd : 'Now'} (${historyDurationValues[index]})`}</div>
                    <Description description={item.description} className="italic" />
                    {item.website ? (
                        <div className="mb-2 text-sm italic print:mb-1 print:text-xs">{item.website}</div>
                    ) : null}
                    {item.stack ? <Stack stack={item.stack} /> : null}
                    {item.positions &&
                        item.positions.map((position) => (
                            <div key={position.title} className="project print:mt-1">
                                <h4 className="title">&gt; {position.title}</h4>
                                <Description description={position.positionDescription} className="italic" />
                                {position?.website ? (
                                    <div className="mb-2 text-sm italic print:mb-1 print:text-xs">{position?.website}</div>
                                ) : null}
                                <Description description={position.description} />
                            </div>
                        ))}
                </section>
            ))}
        </CVSection>
    );
}
