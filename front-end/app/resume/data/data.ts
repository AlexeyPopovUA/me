const data = {
    user: {
        name: "Oleksii",
        surname: "Popov",
        initials: "O.Y.",
        position: "Fullstack Software Engineer (React/NodeJS/TypeScript/AWS)",
        Website: { title: "oleksiipopov.com", url: "https://oleksiipopov.com" },
        LinkedIn: { title: "linkedin.com/in/oleksii-popov", url: "https://linkedin.com/in/oleksii-popov" },
        GitHub: { title: "github.com/AlexeyPopovUA", url: "https://github.com/AlexeyPopovUA" },
        Email: "opportunities@oleksiipopov.com",
        Address: "Klagenfurt-Villach area, Austria",
        Phone: "+436765408426"
    },
    intro: {
        title: "Intro",
        description: [
            "I am a skilled software developer with 12 years of experience in web technologies. I am passionate about developing user-friendly products and have a track record of designing and implementing full-stack solutions, combining frontend, cloud native, and backend areas. My expertise lies in the architecture and development of high-scale single page applications, UI libraries, and SDKs, as well as in the implementation of CI/CD, hosting and distribution solutions.",
            "I am proficient in TypeScript and JavaScript across all stacks and use them whenever possible. However, I am also experienced in maintaining projects in other languages such as Java and PHP.",
            "I am enthusiastic about optimizing applications for improved runtime and faster loading speeds, both for existing projects and new ones."
        ]
    },
    contacts: {
        Nationality: "Dutch",
        "I speak": "English, Ukrainian, Russian, Dutch (A2)"
    },
    skills: [
        {
            name: "General",
            description: [
                "Architecture and development of high scale single page applications, UI libraries and SDK's, microservices and their infrastructure. System design of full-stack solutions. Application optimization for higher runtime and loading speed and scalability",
                "Good knowledge of object-oriented principles, design patterns, data structures",
                "Leading development of high quality technical solutions, cross-team collaboration, technical interviews, mentorship, code refactoring and review, unit/integration tests. Defining the vision, development strategy and priorities for technologies in projects"
            ]
        },
        {
            name: "Programming languages",
            description:
                "Advanced knowledge of JavaScript, TypeScript, NodeJS, HTML, CSS, SCSS. Basic knowledge of Java, PHP"
        },
        {
            name: "Frontend",
            description: "React/Redux/Thunk/Saga, GatsbyJS, NextJS, Tailwind CSS, Storybook etc."
        },
        {
            name: "Cloud",
            description: "AWS, AWS-CDK, AWS-SDK, Serverless"
        },
        {
            name: "Backend",
            description: "NodeJS, Serverless, Express JS, Wordpress, Netlify CMS, GraphQL, MongoDB, DynamoDB, MySQL"
        },
        {
            name: "Testing",
            description: "Jest, Mocha, Selenium, Cucumber"
        },
        {
            name: "Other technologies",
            description: [
                "Webpack, Rollup, Lerna, NPM, Elastic Search & Kibana, Sumologic, Scalyr, NewRelic, TeamCity, Jenkins, ESList, Prettify, SonarQube/Cloud, sitespeed.io, Lighthouse"
            ]
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
            company: "Dynatrace (Klagenfurt, Austria)",
            title: "Senior Software Developer",
            dateStart: "October 2023",
            dateEnd: "",
            description: [
                "Maintenance of the new Dynatrace Kubernetes web application",
                "Maintenance of the automated tests"
            ],
            stack: "React, Typescript, Docker, Kubernetes, NodeJS, Java"
        },
        {
            company: "TomTom (Amsterdam, Netherlands)",
            title: "Expert Software Developer",
            dateStart: "March 2021",
            dateEnd: "September 2023",
            description: [
                "Designed and developed the core part of a new route planning single page application - https://plan.tomtom.com. It is a React PWA with pre-rendering, lazy loading, localization, hot module reloading etc",
                "Started development of the new web SDK for TomTom public services and it's distribution infrastructure",
                "Designed and implemented a micro-frontend app for convenient exploration of numerous library demo apps",
                "Implemented a microservice for authentication and it's infrastructure",
                "Supported and improved AWS CI/CD system for https://plan.tomtom.com",
                "Added feature branches support for a high concurrency automation testing infrastructure of https://plan.tomtom.com with feature branch matching between projects",
                "Implemented performance testing dashboard for the existing performance metric collection system"
            ],
            stack: "React, Redux, Thunk, Typescript, GatsbyJS, TailwindCSS, GraphQL, Docker, nodejs, scss, jest, AWS, aws-cdk, aws-sdk, sitespeed.io, Grafana, Storybook, Java, Selenium, GitHub actions"
        },
        {
            company: "TomTom (Amsterdam, Netherlands)",
            title: "Senior Software Developer",
            dateStart: "January 2019",
            dateEnd: "March 2021",
            description: [
                "Designed and developed significant part of a next generation mobile friendly Road Trips single page application with pre-rendering, server-side rendering, lazy loading, localization, hot module reloading etc. This project was cancelled :( , but re-born in a new route planning web app - https://plan.tomtom.com",
                "Implemented AWS CI/CD system with feature branches support for the web app",
                "Initiated and implemented basis of reusable UI and SDK npm libraries and their distribution infrastructure with feature branches support. That accelerated and simplified collaboration between mobile and web development teams",
                "Implemented high concurrency automation testing infrastructure for the web app that minimized execution time of Selenium java tests from 2 hours to 3 - 5 minutes. Also integrated it with existing CI/CD of the web app.",
                "Implemented POC of basic performance testing analysis for web app and infrastructure in AWS, which became a part of regular team workflow.",
                "Implemented microservices for logs proxying, runtime configuration delivery, CI/CD etc and their infrastructure",
                "Implemented POC of realtime technical log monitoring system which became a part of team workflow",
                "Developed a POC service with backend side map rendering"
            ],
            stack: "React, Redux, Saga, TypeScript, Docker, NodeJS, Express JS, SCSS, Jest, AWS, Serverless, aws-cdk, aws-sdk, sitespeed.io, Grafana, Storybook, Java, Selenium"
        },
        {
            company: "Albelli (Amsterdam, Netherlands)",
            title: "Software developer / Senior software developer",
            dateStart: "April 2016",
            dateEnd: "December 2018",
            description: [
                "Participated in development and maintenance of online photo editors and hybrid mobile application",
                "Developed different tools for debugging, logging and fixing customer issues",
                "Set up code quality monitoring system"
            ],
            stack: "JavaScript, TypeScript, SCSS, NodeJS, google-closure-library, Mocha, Java, Grunt, Selenium"
        },
        {
            company: "Insoft Global (Ukraine)",
            title: "JavaScript Developer",
            dateStart: "March 2013",
            dateEnd: "March 2016",
            description: [
                "Participated in front end and server side development of cloud management platforms, energy management and infrastructure management platforms.",
                "Implemented POC of a hybrid mobile application",
                "Code review, code refactoring, technical interviews, mentorship"
            ],
            stack: "Sencha ExtJS, SCSS, NodeJS, Java"
        },
        {
            company: "Exadel",
            title: "JavaScript Developer",
            dateStart: "July 2012",
            dateEnd: "March 2013",
            description: "Participated in front end development of a Next Wave Logistics (e-commerce project)",
            stack: "JavaScript, jQuery, CSS, Backbone JS"
        },
        {
            company: "Simple Solutions",
            title: "Junior PHP Developer",
            dateStart: "January 2012",
            dateEnd: "July 2012",
            description: [
                "Developed numerous websites using Wordpress and OpenCart. Implemented plugins, widgets and themes for Wordpress.",
                "Preliminary project analysis. Tasks estimation. User guides writing"
            ],
            stack: "PHP, MySQL, LAMP, WordPress, JavaScript, jQuery, CSS"
        },
        {
            company: "Simple Solutions",
            title: "QA Engineer",
            dateStart: "August 2011",
            dateEnd: "January 2012",
            description: "Manual testing. Specification writing. UI prototyping"
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
            name: "My Software Development blog and portfolio (early stage)",
            description: "It is a wordpress.com powered blog",
            links: [
                {
                    name: "Blog",
                    icon: "",
                    link: "https://blog.oleksiipopov.com"
                },
                {
                    name: "Portfolio page",
                    icon: "",
                    link: "https://blog.oleksiipopov.com/portfolio"
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
};

export default data;
