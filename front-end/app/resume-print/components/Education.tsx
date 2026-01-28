import React from 'react';
import CVSection from './CVSection';
import data from '../data/data';
import { Description } from './Description';

type EducationItem = (typeof data.education)[0];

type GroupedEducation = {
    university: string;
    positions: EducationItem[];
};

export function Education(props: { education: typeof data.education }) {
    const groupedEducation = props.education.reduce<GroupedEducation[]>((acc, item) => {
        const existing = acc.find((g) => g.university === item.company);
        if (existing) {
            existing.positions.push(item);
        } else {
            acc.push({
                university: item.company,
                positions: [item],
            });
        }
        return acc;
    }, []);

    return (
        <CVSection cls="education" title="Education">
            {groupedEducation.map((group) => (
                <section key={group.university} className="education-section flex flex-col print:gap-1">
                    <h3 className="company-name font-bold">{group.university}</h3>
                    {group.positions.map((item) => (
                        <div key={item.title} className="project print:mt-1">
                            <h4 className="title">&gt; {item.title}</h4>
                            <div className="font-bold">{item.date}</div>
                            <Description description={item.description} className="italic" />
                        </div>
                    ))}
                </section>
            ))}
        </CVSection>
    );
}