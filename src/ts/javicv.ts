
//
// Imports
//
import CV2 from './cv2';


/**
 * My CV class
 */
export default class JaviCV extends CV2 {

    static readonly PDF_OUT:string = 'cv.pdf';

    /**
     * Generate both html and pdf
     */
    findJob(company:string|null = null, year:number|null = null, debug=false): Promise<void> {

        // Optional name of the company
        const futureCompany = company ? (company+'??') : '???';

        // Big object with the data
        const data = {
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
                    title: "Full-stack developer",
                    desc: "Biome Makers",
                    icon: "work",
                    year: "2016-present"
                },
            ],
        };

        // Extra future job
        data.timeline.push({
            title: "",
            desc: futureCompany,
            icon: "chair",
            year: "" + ( year || new Date().getFullYear())
        });


        // PDF metadata
        const pdf_metadata = {
            'Subject': 'Resume',
            'Title': 'CV Javier Fresno',
            'Author': 'Javier Fresno',
            'Keywords+': [ 'Software engineer', 'PhD Computer Science', 'Full stack' ],
            'Creator': 'Javi Node.js+TSC+SASS+HTML',
        };


        if(debug){
            return this.debug(data);
        }

        return this.render(data, JaviCV.PDF_OUT, pdf_metadata);
    }

    /**
     * Just console.log
     */
    say(msg:string){
        console.log(`🗨️  ${msg}`);
    }


} // JaviCV class