import { ResumeT } from "../ts/ResumeT";

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


    pdfMetadata: {
        'Subject': 'Resume',
        'Title': 'CV Javier Fresno',
        'Author': 'Javier Fresno',
        'Keywords+': [ 'Software engineer', 'PhD Computer Science', 'Full stack' ],
        'Creator': 'Javi Node.js+TSC+SASS+HTML',
    },

};

export default resume;