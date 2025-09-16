import React from 'react';
import Image from 'next/image';

import data from '../data/data';
import { getInsideImageURL } from '@/lib/image';

type Props = {
    user: typeof data.user;
    contacts: typeof data.contacts;
}

export default async function Header(props: Props) {
    const insideUrlProps: getInsideImageURL.Props = {
        width: 500,
        height: 400,
        src: '/pages/resume-olena/resume-olena-profile.jpg',
    };
    const insideUrl = getInsideImageURL(insideUrlProps);

    return (
        <div className="flex flex-col items-center">
            <h1>{props.user.name} {props.user.surname}</h1>

            <div className="flex w-full flex-row gap-8">
                <Image
                    className="flex-0 not-prose w-36 object-contain object-top"
                    src={insideUrl}
                    alt="Profile photo of Olena Tymchenko"
                    unoptimized={true}
                    width={insideUrlProps.width}
                    height={insideUrlProps.height}
                />
                <div className="flex-4 mb-4 text-left sm:mb-0">
                    {props.user.position ? <div className="mb-4 text-3xl">{props.user.position}</div> : null}
                    <div className="max-w-sm whitespace-nowrap print:mb-2">🇦🇹&nbsp;{props.user.Address}</div>
                    <div className="max-w-sm whitespace-nowrap print:mb-2">
                        📨&nbsp;<a href={`mailto:${props.user.Email}`}>{props.user.Email}</a>
                    </div>
                    <div className="max-w-sm whitespace-nowrap print:mb-2">
                        &#128222;&nbsp;<a href={`callto:${props.user.Phone}`}>{props.user.Phone}</a>
                    </div>
                    <div className="max-w-sm whitespace-nowrap print:mb-2">🌍&nbsp;Sprache: {props.contacts['I speak']}</div>
                    <div className="max-w-sm whitespace-nowrap print:mb-2">🇳🇱&nbsp;🇺🇦&nbsp;Nationalität: {props.contacts.Nationality}</div>
                </div>
            </div>
        </div>
    );
}
