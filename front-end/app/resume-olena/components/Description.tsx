import React from 'react';
import clsx from 'clsx';

export function Description(props: { description: string | string[]; className?: string }) {
    if (Array.isArray(props.description)) {
        return (
            <div className={clsx('flex flex-col gap-2 print:gap-1', props.className)}>
                {props.description.map((descr, i) => (
                    <div
                        key={descr.slice(0, 20)}
                        className={clsx('flex flex-col', {
                            'border-b print:border-b-0': i !== props.description.length - 1,
                        })}
                    >
                        {descr}
                    </div>
                ))}
            </div>
        );
    }

    return props.description ? <div className={clsx('description col-span-3 col-start-2 pb-2 print:pb-1', props.className)}>{props.description}</div> : null;
}
