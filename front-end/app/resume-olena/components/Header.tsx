import React from 'react';
import Image from 'next/image';

import data from "../data/data";
import {getInsideImageURL} from "@/lib/image";

type Props = {
  user: typeof data.user;
  contacts: typeof data.contacts;
}

export default async function Header(props: Props) {
  const contacts = [props.user.Address, props.user.Email, props.user.Phone, `I speak ${props.contacts["I speak"]}`, `Nationality: ${props.contacts.Nationality}`];
  const insideUrlProps: getInsideImageURL.Props = { width: 500, height: 400, src: "/pages/resume-olena/resume-olena-profile.jpg" };
  const insideUrl = getInsideImageURL(insideUrlProps);

  return (
    <div className="flex flex-col items-center">
      <h1>{props.user.name} {props.user.surname}</h1>

      <div className="flex flex-row gap-8 w-full">
        <Image
          className="flex-0 w-36 not-prose object-contain object-top"
          src={insideUrl}
          alt="Profile photo of Olena Tymchenko"
          unoptimized={true}
          width={insideUrlProps.width}
          height={insideUrlProps.height}
        />
        <div className="flex-4 text-left mb-4 sm:mb-0 mr-8">
          <div className="text-3xl mb-4">{props.user.position}</div>
          {contacts.map(contact => (
            <div key={contact}>{contact}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
