import React from 'react';

import data from "../data/data";

type Props = {
    user: typeof data.user;
    contacts: typeof data.contacts;
}

export default function Header(props: Props) {
    return (
        <div className="flex flex-col items-center">
            <h1>{props.user.name} {props.user.surname}</h1>
            <div className="text-2xl text-center mb-4">{props.user.position}</div>

            <div className="flex flex-col sm:flex-row text-left">
                <div className="mb-4 sm:mb-0 mr-8">
                    <div className="max-w-sm whitespace-nowrap">🇦🇹&nbsp;{props.user.Address}</div>
                    <div className="max-w-sm whitespace-nowrap">📨&nbsp;<a
                        href={`mailto:${props.user.Email}`}>{props.user.Email}</a></div>
                    <div className="max-w-sm whitespace-nowrap">🌍&nbsp;I speak {props.contacts["I speak"]}</div>
                </div>
                <div>
                    <div>
                        💼&nbsp;<a className="underline whitespace-nowrap"
                           href={props.user.Website.url}>{props.user.Website.title}</a>
                    </div>
                    <div>
                        👨🏻‍💻&nbsp;<a className="underline whitespace-nowrap"
                           href={props.user.GitHub.url}>{props.user.GitHub.title}</a>
                    </div>
                    <div>
                        🪪&nbsp;<a className="underline whitespace-nowrap"
                           href={props.user.LinkedIn.url}>{props.user.LinkedIn.title}</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
