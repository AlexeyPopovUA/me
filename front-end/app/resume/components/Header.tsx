import React from 'react';

import data from "../data/data";

type Props = {
    user: typeof data.user;
    contacts: typeof data.contacts;
}

const Header = (props: Props) => {
    const websites = [props.user.Website, props.user.GitHub, props.user.LinkedIn];
    const contacts = [props.user.Address, props.user.Email, props.user.Phone, `I speak ${props.contacts["I speak"]}`];

    return (
        <div className="flex flex-col items-center">
            <h1 className="font-bold text-3xl">{props.user.name} {props.user.surname}</h1>
            <div className="text-xl text-center mb-4">{props.user.position}</div>

            <div className="flex flex-col sm:flex-row">
                <div className="text-left mb-4 sm:mb-0 mr-8">
                    {contacts.map(contact => (
                        <div className="max-w-sm" key={contact}>{contact}</div>
                    ))}
                </div>
                <div className="text-left">
                    {websites.map(site => (
                        <a className="block underline whitespace-nowrap" key={site.title}
                           href={site.url}>{site.title}</a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Header;
