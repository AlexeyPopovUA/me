import React from 'react';

import data from "../data/data";

type Props = {
    user: typeof data.user;
    contacts: typeof data.contacts;
}

const Header = (props: Props) => {
    const contacts = [props.user.Address, props.user.Email, `I speak ${props.contacts["I speak"]}`];

    return (
        <div className="flex flex-col items-center">
            <h1>{props.user.name} {props.user.surname}</h1>
            <div className="text-xl text-center mb-4">{props.user.position}</div>

            <div className="flex flex-col sm:flex-row">
                <div className="text-left mb-4 sm:mb-0 mr-8">
                    {contacts.map(contact => (
                        <div className="" key={contact}>{contact}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Header;
