const data = Object.seal({
    user: {
        name: "Olena",
        surname: "Tymchenko",
        initials: "O.O.",
        position: "Marketing Manager",
        Email: "alenatymchenko@gmail.com",
        Address: "Klagenfurt am Wörthersee, Österreich",
        Phone: "+43 676 540 84 32",
        EducationLevel: "MSc"
    },
    intro: {
        title: "Einführung",
        description: [
            "Ich bin eine erfahrene ...bla bla",
        ]
    },
    contacts: {
        Nationality: "Niederländisch und Ukrainisch",
        "I speak": "Englisch, Deutsch (B1), Niederländisch, Ukrainisch, Russisch"
    },
    skills: [
        {
            name: "SEO",
            description: "Analyse der Website-Struktur, Optimierung von Webseiten, Texterstellung, Kommunikation mit Website-Besuchern, Internet-Marketing, Benutzeranalyse, Berichterstellung"
        },
        {
            name: "Bankerfahrung",
            description: "Durchführung von Datenanalysen im Geldtransferbericht. Arbeit mit Transfersystemen (CONTACT, Western Union, UNIStream, Lider, Anelik, MIGOM, SWIFT). Unterstützung von Privatpersonen und Unternehmen (Banküberweisung, Kontoeröffnung, Geldverwaltung, Hypotheken, Einlagen und Kredite). Administrative Arbeit"
        }
    ],
    certificates: [],
    experience: [
        {
            company: "Ukrainisches Hosting (Charkiw, Ukraine) 🇺🇦",
            dateStart: "April 2010",
            dateEnd: "May 2016",
            positions: [
                {
                    title: "SEO-Optimierer",
                    dateStart: "April 2010",
                    dateEnd: "May 2016",
                    description: [
                        "Optimierung von Webseiten für eine bessere Positionierung in Google und Yandex"
                    ]
                }
            ],
            description: "Hosting- und IT-Dienstleistungsunternehmen",
            stack: ""
        },
        {
            company: "FC Bank (Charkiw, Ukraine) 🇺🇦",
            website: undefined,
            dateStart: "December 2009",
            dateEnd: "March 2010",
            positions: [
                {
                    title: "Ökonom",
                    dateStart: "December 2009",
                    dateEnd: "March 2010",
                    description: [
                        "Berichterstellung, Arbeit mit Datenbanken, Kontrolle des Geldflusses"
                    ]
                }
            ],
            description: "Kommerzielle Bank",
            stack: ""
        },
        {
            company: "ProCredit Bank (Charkiw, Ukraine) 🇺🇦",
            website: undefined,
            dateStart: "August 2008",
            dateEnd: "August 2009",
            positions: [
                {
                    title: "Kundenbetreuer",
                    dateStart: "August 2008",
                    dateEnd: "August 2009",
                    description: [
                        "Berichterstellung, Arbeit mit Kunden, Kontoverwaltung, Einlagenportfolio, Kreditportfolio, Arbeit mit Plastikkarten"
                    ]
                }
            ],
            description: "Kommerzielle Bank",
            stack: ""
        },
        {
            company: "TNS-Ukraine (Charkiw, Ukraine) 🇺🇦",
            website: undefined,
            dateStart: "2004",
            dateEnd: "2008",
            positions: [
                {
                    title: "Operator-Interviewer",
                    dateStart: "2004",
                    dateEnd: "2008",
                    description: [
                        "Sammlung und primäre Verarbeitung von Daten für weitere soziologische Forschung"
                    ]
                }
            ],
            description: "Marketingagentur",
            stack: ""
        }
    ],
    education: [
        {
            company: "Charkiwer Universität für Bankwesen (Ukraine)",
            title: "Master of Science (MSc)",
            date: "2007 - 2008",
            description: "Bankwesen"
        },
        {
            company: "Charkiwer Universität für Bankwesen (Ukraine)",
            title: "Bachelor of Science (BSc)",
            date: "2003 - 2007",
            description: "Bankwesen"
        }
    ],
    ownProjects: [
        {
            name: "Mein Hobby-Blog",
            description:
                "Mein Hobby-Blog über interessante Orte in den Niederlanden",
            links: [
                {
                    name: "Website",
                    icon: "",
                    link: "https://www.zapiskimami.com"
                }
            ]
        }
    ]
});

export default data;