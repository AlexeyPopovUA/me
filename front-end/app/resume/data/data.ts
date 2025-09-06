const data = Object.seal({
    user: {
        name: 'Oleksii',
        surname: 'Popov',
        initials: 'O.Y.',
        position: 'Senior Full-Stack Software Developer (React/TypeScript/AWS/Node.js)',
        Website: { title: 'oleksiipopov.com', url: 'https://oleksiipopov.com' },
        LinkedIn: { title: 'linkedin.com/in/oleksii-popov', url: 'https://linkedin.com/in/oleksii-popov' },
        GitHub: { title: 'github.com/AlexeyPopovUA', url: 'https://github.com/AlexeyPopovUA' },
        Email: 'opportunities@oleksiipopov.com',
        Address: 'Klagenfurt am Wörthersee, Austria',
        EducationLevel: 'MSc',
    },
    intro: {
        title: 'About Me',
        description: [
            "I'm a front-end leaning full-stack software developer with over 13 years of experience, including 7 in senior roles.",
            'I build user-centric products, leveraging my expertise across frontend, cloud-native, and backend technologies.',
            'I specialize in architecting and developing high-scale single-page applications, UI libraries, and SDKs, while also implementing CI/CD pipelines, hosting, and distribution solutions.',
            'I excel at optimizing application performance for improved runtime efficiency and faster load speeds.',
            'My experience includes leading the development of high-quality technical solutions, conducting technical interviews, and mentoring team members.',
            'I also bring experience in defining project visions, setting development strategies, and prioritizing technologies to align with business goals.',
        ],
    },
    contacts: {
        Nationality: 'Dutch',
        'I speak': 'English, Ukrainian, Russian, Dutch',
    },
    skills: [
        {
            name: 'Programming languages',
            description: 'Advanced knowledge of JavaScript, TypeScript, Node.js, HTML, CSS',
        },
        {
            name: 'Frontend',
            description: 'React, Redux, TailwindCSS, Next.js, Storybook, Webpack, Lerna, NPM, pnpm, yarn',
        },
        {
            name: 'Cloud & Backend',
            description: 'Node.js, AWS, AWS-CDK, AWS-SDK, Serverless, Express JS, SQL and non-SQL DBs',
        },
        {
            name: 'Other technologies & AI',
            description:
                'Mastra AI, Claude-code, Gemini-cli, GitHub Co-pilot, GitHub Actions, GitLab Pipelines, Jest, Selenium, Webpack, Lerna, NPM, Elastic Search & Kibana, Sumologic, NewRelic, SonarQube, Lighthouse',
        },
    ],
    certificates: [
        {
            company: 'Udemy',
            title: 'Kubernetes for the Absolute Beginners - Hands-on',
            date: 'January 2024',
            link: 'https://www.udemy.com/certificate/UC-f1c86ecf-2f67-4cea-8a6d-8db5b7ffbd39/',
        },
        {
            company: 'Coursera Course Certificates',
            title: 'Data structures: Measuring and Optimizing Performance',
            date: 'November 2015',
            link: 'https://www.coursera.org/account/accomplishments/verify/23F54S3MXLY7',
        },
        {
            company: 'Coursera Course Certificates',
            title: 'Object Oriented Programming in Java',
            date: 'October 2015',
            link: 'https://www.coursera.org/account/accomplishments/verify/Q43W5UTZT6VZ',
        },
        {
            company: 'Udemy',
            title: 'Introduction to TypeScript',
            date: 'July 2015',
            link: 'https://www.udemy.com/certificate/UC-71722OOL/',
        },
    ],
    experience: [
        {
            company: 'Self-employed (Remote) 🌍',
            dateStart: 'April 2025',
            dateEnd: '',
            positions: [
                {
                    title: 'Senior Software Developer at Innervate (Remote, contract) 🌍',
                    dateStart: 'April 2025',
                    dateEnd: '',
                    website: 'https://www.innervate.com/',
                    positionDescription: 'Innervate (formerly RevJet) provides a platform for digital advertising and marketing solutions.',
                    description: [
                        'Maintained and enhanced multiple full-stack web applications.',
                        'Engineered and implemented shared GitLab CI/CD pipeline templates reducing deployment time and complexity',
                        'Migrated more than 10 projects to the new CI/CD system',
                        'Developed AI-based migration tools and conducted experiments with Retrieval-Augmented Generation (RAG) systems.',
                    ],
                },
            ],
            description: [],
            stack: 'React, Typescript, Next.js, Docker, Kubernetes, Node.js, GitLab, AI',
        },
        {
            company: 'Dynatrace (Klagenfurt am Wörthersee, Austria) 🇦🇹',
            website: 'https://www.dynatrace.com/',
            dateStart: 'October 2023',
            dateEnd: 'March 2025',
            positions: [
                {
                    title: 'Senior Software Developer',
                    dateStart: 'October 2023',
                    dateEnd: 'March 2025',
                    website: '',
                    positionDescription: '',
                    description: [
                        'Maintenance and feature development for a new Kubernetes monitoring web application, including related services and libraries, serving enterprise customers.',
                        'Improved application performance by profiling React components and implementing targeted optimizations.',
                        'Conducted code reviews, refactored legacy code to modern standards, and participated in technical interviews for multiple teams.',
                    ],
                },
            ],
            description: [
                'Dynatrace is an observability platform that uses AI to monitor application performance, cloud infrastructure, and user experience.',
            ],
            stack: 'React, Typescript, Docker, Kubernetes, Dynatrace, Node.js, Java',
        },
        {
            company: 'TomTom (Amsterdam, Netherlands) 🇳🇱',
            website: 'https://www.tomtom.com/',
            dateStart: 'January 2019',
            dateEnd: 'September 2023',
            positions: [
                {
                    title: 'Expert Software Developer',
                    dateStart: 'March 2021',
                    dateEnd: 'September 2023',
                    website: '',
                    positionDescription: '',
                    description: [
                        'Developed the core architecture of a new route planning web application (plan.tomtom.com).',
                        'Started development of a new web SDK for TomTom public services, including its distribution infrastructure, improving developer experience and reducing integration time.',
                        'Designed and implemented a microservice for authentication.',
                        'Authored technical documentation for knowledge sharing and onboarding for new team members.',
                        'Supported and improved AWS CI/CD system, high concurrency automation testing infrastructure and performance testing dashboard.',
                        'Code review, code refactoring, technical interviews, hiring, mentorship',
                    ],
                },
                {
                    title: 'Senior Software Developer',
                    dateStart: 'January 2019',
                    dateEnd: 'March 2021',
                    website: '',
                    positionDescription: '',
                    description: [
                        'Established a new development team, participating in hiring, leading onboarding and mentorship.',
                        'Architected and developed the core of a next-generation Road Trips web application, featuring pre-rendering, server-side rendering, and localization, supporting a global user base.',
                        'Implemented a robust AWS CI/CD system with feature branch support, enabling parallel development and faster release cycles.',
                        'Created a high-concurrency automation testing infrastructure that reduced Selenium test execution time from 2 hours to 3-5 minutes, a 96% decrease.',
                        'Developed a performance testing analysis system and web application observability tools, providing data-driven insights for performance optimization.',
                    ],
                },
            ],
            description: [
                'TomTom is a global leader in location technology, providing navigation, maps, and traffic data for drivers, businesses, and smart cities',
            ],
            stack: 'React, Redux, Typescript, Next.js, TailwindCSS, GraphQL, Docker, Node.js, AWS, AWS-CDK, AWS-SDK, sitespeed.io, Grafana, Storybook, Java, Selenium, GitHub Actions, Microservices Architecture, API Development',
        },
        {
            company: 'Albelli (Amsterdam, Netherlands) 🇳🇱',
            website: 'https://www.albelli.nl/',
            dateStart: 'April 2016',
            dateEnd: 'January 2019',
            positions: [
                {
                    title: 'Software developer > Senior software developer',
                    dateStart: 'April 2016',
                    dateEnd: 'January 2019',
                    website: '',
                    positionDescription: '',
                    description: [
                        'Participated in development and maintenance of online photo editors and hybrid mobile application.',
                        'Introduced latest JavaScript support into the mature product (100k executable lines).',
                        'Introduced the latest unit testing system',
                        'Developed different tools for debugging, logging and fixing customer issues, simplifying customer support.',
                        'Set up code quality monitoring system.',
                    ],
                },
            ],
            description: ['Albelli specializes in personalized photo products like photo books, wall art, and calendars.'],
            stack: 'JavaScript, TypeScript, SCSS, Node.js, google-closure-library, Mocha, Java, Grunt, Selenium',
        },
        {
            company: 'Various companies (web studios and outsourcing) 🇺🇦',
            website: '',
            dateStart: 'August 2011',
            dateEnd: 'April 2016',
            positions: [
                {
                    title: 'QA > Junior PHP > JavaScript Developer',
                    dateStart: 'August 2011',
                    dateEnd: 'April 2016',
                    website: '',
                    positionDescription: '',
                    description: [
                        'Developed frontend and server-side components for cloud management and energy management platforms.',
                        'Built and maintained small to mid-scale web applications, marketing and e-commerce sites using PHP, JavaScript',
                        'Refactored legacy PHP / jQuery codebases to modular, maintainable architectures, reducing defect rates and easing feature delivery',
                        'Collaborated with designers and PMs to scope features, estimate effort, and deliver iterative releases under tight outsourcing timelines',
                        'Participated in code reviews, led technical interviews, hiring, and mentorship for junior developers.',
                    ],
                },
            ],
            description: [],
            stack: 'JavaScript, SCSS, Node.js, Java, jQuery, CSS, PHP, MySQL, LAMP, WordPress',
        },
    ],
    education: [
        {
            company: 'National Technical University Kharkiv Polytechnical Institute of Ukraine',
            title: 'MSc in Mechanical Engineering (Cryogenic technology)',
            date: '2009 - 2011',
            description: '',
        },
        {
            company: 'National Technical University Kharkiv Polytechnical Institute of Ukraine',
            title: 'BSc in Mechanical Engineering (Cryogenic technology)',
            date: '2005 - 2009',
            description: '',
        },
    ],
    ownProjects: [
        {
            name: 'Personal software development blog and portfolio',
            description:
                'This is my personal software development blog, portfolio and CV. It is a statically exported web application. It is built using Next.js, TailwindCSS and AWS Serverless Image Handler.',
            links: [
                {
                    name: 'Website',
                    icon: '',
                    link: 'https://oleksiipopov.com',
                },
            ],
        },
        {
            name: 'Hobby blog for my wife',
            description:
                'Static website generated by Gatsby JS, backed by Netlify CMS and Github as an identity provider and backend. Also AWS lambda for oAuth via GitHub',
            links: [
                {
                    name: 'Website',
                    icon: '',
                    link: 'https://www.zapiskimami.com',
                },
            ],
        },
        {
            name: 'Advanced Logger',
            description:
                'Open-source isomorphic javascript module for reporting data (logs) to remote log storages like SumoLogic and Loggly with support of different reporting strategies',
            links: [
                {
                    name: 'Website',
                    icon: '',
                    link: 'https://www.advancedlogger.com',
                },
                {
                    name: 'GitHub',
                    icon: '',
                    link: 'https://github.com/AlexeyPopovUA/advanced-logger',
                },
            ],
        },
    ],
});

export default data;
