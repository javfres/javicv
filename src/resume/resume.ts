
import { ResumeT, html } from "../ts/ResumeT";
 
const resume: ResumeT = {

    name: "Javier Fresno",

    titles: [
        'Software Engineer',
        'PhD High Performance Computing',
    ],

    links: [
        {
            href: "mailto:javfres@gmail.com",
            icon: 'mail',
            text: 'javfres@gmail.com',
        },
        {
            href: "https://linkedin.com/in/jfresno/",
            icon: 'linkedin',
            text: 'linkedin.com/in/jfresno',
        },
        {
            href: "https://github.com/javfres",
            icon: 'github',
            text: 'github.com/javfres',
        },
    ],

    timeline: [
        {
            title: "Computer Science",
            desc: "BSc Degree",
            icon: "uni1",
            year: "2010"
        },
        {
            title: "Infor. & Comm.",
            desc: "MSc Degree",
            icon: "uni2",
            year: "2012"
        },
        {
            title: "Parallel Computing",
            desc: "PhD Degree",
            icon: "phd",
            year: "2015"
        },
        {
            title: "Software Engineer",
            desc: "Biome Makers",
            icon: "work",
            year: "2016-2021"
        },
        {
            title: "Sr. Software Engineer",
            desc: "Biome Makers",
            icon: "work",
            year: "2021-present"
        },
    ],

    about: html`
        <p>
            Hi!, I am Javier, a Software Engineer.

            For the last years I have been in a biotech startup working
            within a multidisciplinary team composed of
            people from all over the world.

            Now I am looking for my next challenge to grow as a developer.
        </p>

        <p>
            Lately I have been working with PHP and TypeScript.
            I have experience as a Full-stack,
            creating Rest APIs,
            making integrations with third-party systems,
            using Amazon AWS cloud, etc.
            But I don't miss any opportunity to learn new things.
        </p>

        <p>
            I have a background in research
            with a PhD in parallel and high performance computing.
        </p>
    `,


    skills: [

        'PHP',
        'Laravel',
        'JavaScript',
        'TypeScript',
        'Node.js',
        'Vue.js',
        'PostgreSQL',

        {
            text: 'AWS',
            title: 'Amazon Web Services',
        },

        'Docker',
        'Git',

        'Rest APIs',
        'C/C++',
        'Python',
        'Pandas, NumPy',
    ],

    experience: [

        {
            company: 'Biome Makers',
            start: 2016,
            place: 'Valladolid, Spain; SF, California',
            logo: 'logo_bm.jpg',

            description: html`
                <p>
                    Biome Makers is a biotech company
                    that uses DNA sequencing to analyze
                    the microbiome in agricultural processes.

                    I was part of the core team that managed to
                    reach <span title="Not an easy task :)">Series A &amp; B</span>.
                </p>
            `,

            positions: [
                {
                    title: 'Senior Software Engineer',
                    description: html`
                        <p>
                            As a senior developer,
                            my responsibilities are to collaborate with the rest of the departments
                            to design the new projects, mentor more junior staff,
                            and ensure software is up-to-date with the latest technologies.
                        </p>
                    `
                },
                {
                    title: 'Software Engineer',
                    description: html`
                        <p>
                            I have been working in many of the company projects such as:
                            the client online portal,
                            our custom LIMS system,
                            the API Rest for laboratory licensing,
                            and many third-party integrations (Stripe, HubSpot, NetSuite).
            
                            Our core stack includes PHP Laravel, Vue.js,
                            and PostgreSQL, all running over AWS instances.
                        </p>
                    `
                }
            ],
        },

        {
            company: 'University of Valladolid',
            start: 2012,
            end: 2015,
            place: 'Valladolid, Spain',
            logo: 'logo_infor.png',

            positions: [
                {
                    title: 'PhD Studentship',
                    description: html`
                        <p>

                            As a Doctor of Computer Science,
                            my research topic was about
                            High Performance Computing.
            
                            I have multiple published papers in
                            national and international journals and conferences.
            
                        </p>
            
                        <p>
                            I have worked developing a C/C++
                            library to improve the performance of
                            software for supercomputers. 
            
                            Moreover, I was a teacher for three years 
                            in the computer science degree.
            
                        </p>
                    `
                },
            ],
        },

        {
            company: 'Alcañiz Fresno\'s',
            start: 2010,
            end: 2016,
            place: 'Valladolid, Spain',
            logo: 'logo_af.png',

            positions: [
                {
                    title: 'Software developer',
                    tags: ['part-time'],
                    description: html`
                        <p>
                            Editorial and printing company.

                            I have worked developing software
                            to automatize the creation of digital documents
                            (epub, pdf, html, xml) using Adobe Indesign Extented Script
                            (Javascript).
                        </p>
                    `
                },
            ],
        },
    ],

    pdfMetadata: {
        'Subject': 'Resume',
        'Title': 'CV Javier Fresno',
        'Author': 'Javier Fresno',
        'Keywords+': [ 'Software engineer', 'PhD Computer Science', 'Full stack' ],
        'Creator': 'Javi Node.js+TSC+SASS+HTML',
    },

};

export default resume;