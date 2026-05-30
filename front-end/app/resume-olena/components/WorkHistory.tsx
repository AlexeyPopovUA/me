import React from 'react';

import CVSection from './CVSection';
import data from '../data/data';
import Tag from '@/components/primitive/Tag';
import { Description } from './Description';

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
    return (
        <CVSection cls="history" title="Berufserfahrung">
            {props.experience.map((item) => (
                <section
                    key={`${item.company}-${item.company}`}
                    className="history-section flex flex-col gap-2 print:gap-1 mt-4 first:mt-0 print:mt-2 print:first:mt-0"
                >
                    <h3 className="company-name font-bold">
                        {item.website ? (
                            <a className="no-underline" href={item.website}>
                                {item.company}
                            </a>
                        ) : (
                            item.company
                        )}
                    </h3>
                    {item.dateStart ? (
                        <div className="font-bold">{`${item.dateStart} - ${item.dateEnd ? item.dateEnd : 'Jetzt'}`}</div>
                    ) : (
                        <div className="font-bold">Jetzt</div>
                    )}

                    <Description description={item.description} className="italic" />
                    {item.website ? (
                        <div className="mb-2 text-sm italic print:mb-1 print:text-xs">{item.website}</div>
                    ) : null}
                    {item.stack ? <Stack stack={item.stack} /> : null}
                    {item.positions &&
                        item.positions.map((position) => (
                            <div key={position.title} className="project print:mt-1">
                                <h4 className="title">&gt; {position.title}</h4>
                                <Description description={position.description} />
                            </div>
                        ))}
                </section>
            ))}
        </CVSection>
    );
}
