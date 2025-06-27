import React from 'react';
import moment from 'moment';
import clsx from 'clsx';

import CVSection from './CVSection';
import data from '../data/data';
import Tag from '@/components/primitive/Tag';

type Props = {
    experience: typeof data.experience;
};

/**
 * Converts "moment" module duration object into the humanized string
 */
function getHumanizedDuration(duration: moment.Duration) {
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
    return result.join(' ');
}

function Description(props: { description: string | string[]; className?: string }) {
    if (Array.isArray(props.description)) {
        return (
            <div className={clsx('flex flex-col gap-2', props.className)}>
                {props.description.map((descr, i) => (
                    <div
                        key={descr.slice(0, 20)}
                        className={clsx('flex flex-col gap-2', {
                            'border-b': i !== props.description.length - 1,
                        })}
                    >
                        {descr}
                    </div>
                ))}
            </div>
        );
    }

    return props.description ? <div className={clsx("description col-span-3 col-start-2 pb-2", props.className)}>{props.description}</div> : null;
}

function Stack(props: { stack: string }) {
    return (
        <div className="description flex flex-row flex-wrap gap-2">
            {props.stack.split(', ').map((item) => (
                <Tag key={item} item={item} />
            ))}
        </div>
    );
}

export default function History(props: Props) {
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
                <section key={`${item.company}-${item.company}`} className="history-section flex flex-col gap-2">
                    <h3 className="company-name font-bold">
                        {item.website ? (
                            <a className="no-underline" href={item.website}>
                                {item.company}
                            </a>
                        ) : (
                            item.company
                        )}
                    </h3>
                    <div className="font-bold">{`${item.dateStart} - ${item.dateEnd ? item.dateEnd : 'Now'} (${historyDurationValues[index]})`}</div>
                    <Description description={item.description} className="italic" />
                    {item.website ? (
                        <a href={item.website} className="mb-2 text-sm italic">
                            {item.website}
                        </a>
                    ) : null}
                    {item.stack ? <Stack stack={item.stack} /> : null}
                    {item.positions &&
                        item.positions.map((position) => (
                            <div key={position.title} className="project">
                                <h4 className="title">&gt; {position.title}</h4>
                                <Description description={position.positionDescription} className="italic" />
                                {position?.website ? (
                                    <a href={position?.website} className="mb-2 text-sm italic">
                                        {position?.website}
                                    </a>
                                ) : null}
                                <Description description={position.description} />
                            </div>
                        ))}
                </section>
            ))}
        </CVSection>
    );
}
