const data = Object.seal({
    user: {
        name: "Oleksii",
        surname: "Popov",
        initials: "O.Y.",
        position: "Full-Stack Software Developer (React/TypeScript/AWS/Node.js)",
        Website: {title: "oleksiipopov.com", url: "https://oleksiipopov.com"},
        LinkedIn: {title: "linkedin.com/in/oleksii-popov", url: "https://linkedin.com/in/oleksii-popov"},
        GitHub: {title: "github.com/AlexeyPopovUA", url: "https://github.com/AlexeyPopovUA"},
        Email: "opportunities@oleksiipopov.com",
        Address: "Klagenfurt am Wörthersee, Austria",
        EducationLevel: "MSc"
    },
    intro: {
        title: "About Me",
        description: [
            "I'm a full-stack software developer with over 13 years of experience, including 7 in senior roles, with focus on front-end development and delivering robust software solutions.",
            "I build user-centric products, leveraging my expertise across frontend, cloud-native, and backend technologies.",
            "I specialize in architecting and developing high-scale single-page applications, UI libraries, and SDKs, while also implementing CI/CD pipelines, hosting, and distribution solutions.",
            "I excel at optimizing application performance for improved runtime efficiency and faster load speeds.",
            "My experience includes leading the development of high-quality technical solutions, conducting technical interviews, and mentoring team members.",
            "I also bring experience in defining project visions, setting development strategies, and prioritizing technologies to align with business goals.",
        ]
    },
    contacts: {
        Nationality: "Dutch",
        "I speak": "English, Ukrainian, Russian, Dutch"
    },
    skills: [
        {
            name: "Programming languages",
            description:
                "Advanced knowledge of JavaScript, TypeScript, Node.js, HTML, CSS, SCSS. Basic knowledge of Java, PHP"
        },
        {
            name: "Frontend",
            description: "React, Redux, TailwindCSS, Next.js, GatsbyJS, Storybook etc."
        },
        {
            name: "Cloud",
            description: "AWS, AWS-CDK, AWS-SDK, Serverless"
        },
        {
            name: "Backend",
            description: "Node.js, Express JS, GraphQL, MongoDB, DynamoDB, MySQL"
        },
        {
            name: "Other technologies",
            description:
                "Jest, Selenium, Webpack, Lerna, NPM, Elastic Search & Kibana, Sumologic, NewRelic, SonarQube, sitespeed.io, Lighthouse"

        }
    ],
    certificates: [
        {
            company: "Udemy",
            title: "Kubernetes for the Absolute Beginners - Hands-on",
            date: "January 2024",
            link: "https://www.udemy.com/certificate/UC-f1c86ecf-2f67-4cea-8a6d-8db5b7ffbd39/"
        },
        {
            company: "Coursera Course Certificates",
            title: "Data structures: Measuring and Optimizing Performance",
            date: "November 2015",
            link: "https://www.coursera.org/account/accomplishments/verify/23F54S3MXLY7"
        },
        {
            company: "Coursera Course Certificates",
            title: "Object Oriented Programming in Java",
            date: "October 2015",
            link: "https://www.coursera.org/account/accomplishments/verify/Q43W5UTZT6VZ"
        },
        {
            company: "Udemy",
            title: "Introduction to TypeScript",
            date: "July 2015",
            link: "https://www.udemy.com/certificate/UC-71722OOL/"
        }
    ],
    experience: [
        {
            company: "Self-employed (Remote) 🌍",
            dateStart: "April 2025",
            dateEnd: "",
            positions: [
                {
                    title: "Senior Software Developer at Innervate (Remote) 🌍",
                    dateStart: "April 2025",
                    dateEnd: "",
                    website: "https://www.innervate.com/",
                    companyDescription: "Innervate (former RevJet) is a company that provides a platform for digital advertising and marketing solutions.",
                    description: [
                        "Maintenance of multiple web applications",
                        "Implementation of new GitLab CI/CD systems",
                    ]
                }
            ],
            description: [
            ],
            stack: "React, Typescript, Docker, Kubernetes, Node.js, GitLab"
        },
        {
            company: "Dynatrace (Klagenfurt am Wörthersee, Austria) 🇦🇹",
            website: "https://www.dynatrace.com/",
            dateStart: "October 2023",
            dateEnd: "March 2025",
            positions: [
                {
                    title: "Senior Software Developer",
                    dateStart: "October 2023",
                    dateEnd: "March 2025",
                    description: [
                        "Maintenance of a new Dynatrace Kubernetes web application, related services and libraries. Profiling and improvements of React application performance.",
                        "Code review, code refactoring, technical interviews for different teams."
                    ]
                }
            ],
            description: [
                "Dynatrace is an observability platform that uses AI to monitor application performance, cloud infrastructure, and user experience"
            ],
            stack: "React, Typescript, Docker, Kubernetes, Dynatrace, Node.js, Java"
        },
        {
            company: "TomTom (Amsterdam, Netherlands) 🇳🇱",
            website: "https://www.tomtom.com/",
            dateStart: "January 2019",
            dateEnd: "September 2023",
            positions: [
                {
                    title: "Expert Software Developer",
                    dateStart: "March 2021",
                    dateEnd: "September 2023",
                    description: [
                        "Developed the core part of a new route planning web application https://plan.tomtom.com.",
                        "Started development of the new web SDK for TomTom public services and it's distribution infrastructure.",
                        "Implemented a micro-service for authentication and it's infrastructure.",
                        "Supported and improved AWS CI/CD system, high concurrency automation testing infrastructure and performance testing dashboard.",
                        "Code review, code refactoring, technical interviews, hiring, mentorship"
                    ]
                },
                {
                    title: "Senior Software Developer",
                    dateStart: "January 2019",
                    dateEnd: "March 2021",
                    description: [
                        "Started a new development team, participated in hiring, onboarding and mentorship.",
                        "Bootstrapped and developed the core part of a next generation Road Trips web application with pre-rendering, server-side rendering, lazy loading and localization.",
                        "Implemented AWS CI/CD system with feature branches support for the web app. Initiated and implemented basis of reusable UI and SDK npm libraries and their distribution infrastructure with feature branches support.",
                        "Implemented high concurrency automation testing infrastructure for the web app that reduced execution time of Selenium java tests from 2 hours to 3 - 5 minutes.",
                        "Implemented a basic performance testing analysis system for web app and its infrastructure.",
                        "Implemented web application observability, runtime configuration delivery, CI/CD and their infrastructure systems.",
                        "Developed a POC service with backend map rendering.",
                    ]
                }
            ],
            description: [
                "TomTom is a global leader in location technology, providing navigation, maps, and traffic data for drivers, businesses, and smart cities"
            ],
            stack: "React, Redux, Thunk, Saga, Typescript, GatsbyJS, TailwindCSS, GraphQL, Docker, Node.js, SCSS, jest, AWS, AWS-CDK, AWS-SDK, sitespeed.io, Grafana, Storybook, Java, Selenium, GitHub actions"
        },
        {
            company: "Albelli (Amsterdam, Netherlands) 🇳🇱",
            website: "https://www.albelli.nl/",
            dateStart: "April 2016",
            dateEnd: "January 2019",
            positions: [
                {
                    title: "Software developer > Senior software developer",
                    dateStart: "April 2016",
                    dateEnd: "January 2019",
                    description: [
                        "Participated in development and maintenance of online photo editors and hybrid mobile application.",
                        "Developed different tools for debugging, logging and fixing customer issues.",
                        "Set up code quality monitoring system."
                    ]
                }
            ],
            description: [
                "Albelli is a company that specializes in creating personalized photo products such as photo books, wall art, and calendars."
            ],
            stack: "JavaScript, TypeScript, SCSS, Node.js, google-closure-library, Mocha, Java, Grunt, Selenium"
        },
        {
            company: "Insoft Global (Kharkiv, Ukraine) 🇺🇦",
            website: "",
            dateStart: "April 2013",
            dateEnd: "April 2016",
            positions: [
                {
                    title: "JavaScript Developer",
                    dateStart: "April 2013",
                    dateEnd: "April 2016",
                    description: [
                        "Participated in front end and server side development of cloud management platforms, energy management and infrastructure management platforms.",
                        "Implemented POC of a hybrid mobile application",
                        "Code review, code refactoring, technical interviews, hiring, onboarding, mentorship"
                    ]
                }
            ],
            description: [
                "Insoft Global is a company that provides software development services for various industries."
            ],
            stack: "Sencha ExtJS, SCSS, Node.js, Java"
        },
        {
            company: "Various companies (web studios and outsourcing) 🇺🇦",
            website: "",
            dateStart: "August 2011",
            dateEnd: "March 2013",
            positions: [
                {
                    title: "QA > Junior PHP > JavaScript Developer",
                    dateStart: "August 2011",
                    dateEnd: "March 2013",
                    description: [
                        "Participated in front end development of an e-commerce project",
                        "Developed numerous websites using Wordpress and OpenCart. Implemented plugins, widgets and themes for Wordpress. Preliminary project analysis. Tasks estimation. User guides writing",
                        "Manual testing. Specification writing. UI prototyping"
                    ]
                }
            ],
            description: [
                "Various companies in web studios and outsourcing providing development and QA services."
            ],
            stack: "JavaScript, jQuery, CSS, Backbone JS, PHP, MySQL, LAMP, WordPress"
        }
    ],
    education: [
        {
            company: "National Technical University Kharkiv Polytechnical Institute of Ukraine",
            title: "Master of Science (MSc)",
            date: "2009 - 2011",
            description: "Mechanical Engineering (Cryogenic technology)"
        },
        {
            company: "National Technical University Kharkiv Polytechnical Institute of Ukraine",
            title: "Bachelor of Science (BSc)",
            date: "2005 - 2009",
            description: "Mechanical Engineering (Cryogenic technology)"
        }
    ],
    ownProjects: [
        {
            name: "Personal software development blog and portfolio",
            description: "This is my personal software development blog, portfolio and CV. It is a statically exported web application. It is built using Next.js, TailwindCSS and AWS Serverless Image Handler.",
            links: [
                {
                    name: "Website",
                    icon: "",
                    link: "https://oleksiipopov.com"
                }
            ]
        },
        {
            name: "Hobby blog for my wife",
            description:
                "Static website generated by Gatsby JS, backed by Netlify CMS and Github as an identity provider and backend. Also AWS lambda for oAuth via GitHub",
            links: [
                {
                    name: "Website",
                    icon: "",
                    link: "https://www.zapiskimami.com"
                }
            ]
        },
        {
            name: "Advanced Logger",
            description:
                "Open-source isomorphic javascript module for reporting data (logs) to remote log storages like SumoLogic and Loggly with support of different reporting strategies",
            links: [
                {
                    name: "Website",
                    icon: "",
                    link: "https://www.advancedlogger.com"
                },
                {
                    name: "GitHub",
                    icon: "",
                    link: "https://github.com/AlexeyPopovUA/advanced-logger"
                }
            ]
        }
    ]
});

export default data;
