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

            <div className="flex w-full flex-row gap-8 print:gap-4 print:text-sm">
                <Image
                    className="resume-profile-photo my-0 block w-36 shrink-0 object-contain object-top print:w-28"
                    src={insideUrl}
                    alt="Profile photo of Olena Tymchenko"
                    unoptimized={true}
                    width={insideUrlProps.width}
                    height={insideUrlProps.height}
                />
                <div className="mb-4 flex-1 text-left sm:mb-0 print:mb-2">
                    {props.user.position ? (
                        <div className="mb-4 text-3xl print:mb-2 print:text-lg">{props.user.position}</div>
                    ) : null}
                    <div className="max-w-sm whitespace-nowrap print:mb-2">🇦🇹&nbsp;{props.user.Address}</div>
                    <div className="max-w-sm whitespace-nowrap print:mb-2">
                        📨&nbsp;<a className="resume-contact-link" href={`mailto:${props.user.Email}`}>{props.user.Email}</a>
                    </div>
                    <div className="max-w-sm whitespace-nowrap print:mb-2">
                        &#128222;&nbsp;<a className="resume-contact-link" href={`tel:${props.user.Phone}`}>{props.user.Phone}</a>
                    </div>
                    <div className="max-w-sm whitespace-nowrap print:mb-2">🌍&nbsp;Sprache: {props.contacts['I speak']}</div>
                    <div className="max-w-sm whitespace-nowrap print:mb-2">🇳🇱&nbsp;🇺🇦&nbsp;Nationalität: {props.contacts.Nationality}</div>
                </div>
            </div>
        </div>
    );
}
