const data = Object.seal({
    user: {
        name: "Olena",
        surname: "Tymchenko",
        initials: "O.O.",
        position: "Marketing Manager",
        Email: "alenatymchenko@gmail.com",
        Address: "Klagenfurt am Wörthersee, Austria",
        Phone: "+43 676 540 84 32",
        EducationLevel: "MSc"
    },
    intro: {
        title: "Intro",
        description: [
            "I am a skilled  ...bla bla",
        ]
    },
    contacts: {
        Nationality: "Dutch and Ukrainian",
        "I speak": "English, German (B1), Dutch, Ukrainian, Russian"
    },
    skills: [
        {
            name: "SEO",
            description: "Analysis of website structure, optimization of web pages, copyrighting, communication with website visitors, internet marketing, user analysis, reporting"
        },
        {
            name: "Banking experience",
            description: "Performed data analysis in money transfer reporting. Worked with transfer systems (CONTACT, Western Union, UNIStream, Lider, Anelik, MIGOM, SWIFT). Supported individuals and businesses (bank transfer, account opening, money management, mortgage, deposits, and loans). Administrative work"
        }
    ],
    certificates: [],
    experience: [
        {
            company: "Ukrainian hosting (Kharkiv, Ukraine) 🇺🇦",
            dateStart: "April 2010",
            dateEnd: "May 2016",
            positions: [
                {
                    title: "SEO optimizer",
                    dateStart: "April 2010",
                    dateEnd: "May 2016",
                    description: [
                        "Web page optimization for better positioning in Google and Yandex"
                    ]
                }
            ],
            description: "Hosting and IT services company",
            stack: ""
        },
        {
            company: "FC Bank (Kharkiv, Ukraine) 🇺🇦",
            website: undefined,
            dateStart: "December 2009",
            dateEnd: "March 2010",
            positions: [
                {
                    title: "Economist",
                    dateStart: "December 2009",
                    dateEnd: "March 2010",
                    description: [
                        "Writing reports, working with databases, cash flow control"
                    ]
                }
            ],
            description: "Commercial bank",
            stack: ""
        },
        {
            company: "ProCredit Bank (Kharkiv, Ukraine) 🇺🇦",
            website: undefined,
            dateStart: "August 2008",
            dateEnd: "August 2009",
            positions: [
                {
                    title: "Customer service representative",
                    dateStart: "August 2008",
                    dateEnd: "August 2009",
                    description: [
                        "Writing reports, working with customers, account management, deposit portfolio, loan portfolio, working with plastic cards"
                    ]
                }
            ],
            description: "Commercial bank",
            stack: ""
        },
        {
            company: "TNS-Ukraine (Kharkiv, Ukraine) 🇺🇦",
            website: undefined,
            dateStart: "2004",
            dateEnd: "2008",
            positions: [
                {
                    title: "Operator interviewer",
                    dateStart: "2004",
                    dateEnd: "2008",
                    description: [
                        "Collection and primary processing of data for further sociological research"
                    ]
                }
            ],
            description: "Marketing agency",
            stack: ""
        }
    ],
    education: [
        {
            company: "Kharkiv University of Banking (Ukraine)",
            title: "Master of Science (MSc)",
            date: "2007 - 2008",
            description: "Banking"
        },
        {
            company: "Kharkiv University of Banking (Ukraine)",
            title: "Bachelor of Science (BSc)",
            date: "2003 - 2007",
            description: "Banking"
        }
    ],
    ownProjects: [
        {
            name: "My hobby blog",
            description:
                "My hobby blog about interesting places in the Netherlands",
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
