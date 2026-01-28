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
            <div className="text-2xl text-center mb-4 print:text-lg print:mb-2">{props.user.position}</div>

            <div className="flex flex-col sm:flex-row text-left print:text-sm">
                <div className="mb-4 sm:mb-0 mr-8 print:mb-2 print:mr-4">
                    <div className="max-w-sm whitespace-nowrap">🇦🇹&nbsp;{props.user.Address}</div>
                    <div className="max-w-sm whitespace-nowrap">📨&nbsp;{props.user.Email}</div>
                    <div className="max-w-sm whitespace-nowrap">🌍&nbsp;I speak {props.contacts["I speak"]}</div>
                </div>
                <div>
                    <div className="whitespace-nowrap">
                        💼&nbsp;{props.user.Website.title}
                    </div>
                    <div className="whitespace-nowrap">
                        👨🏻‍💻&nbsp;{props.user.GitHub.title}
                    </div>
                    <div className="whitespace-nowrap">
                        🪪&nbsp;{props.user.LinkedIn.title}
                    </div>
                </div>
            </div>
        </div>
    );
}
