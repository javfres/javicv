//
// Imports
//
import resume from '../resume/resume';
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
        const data = resume;

        // Extra future job
        data.timeline.push({
            title: "",
            desc: futureCompany,
            icon: "chair",
            year: "" + ( year || new Date().getFullYear())
        });


        if (debug) {
            return this.debug(data);
        }

        return this.render(data, JaviCV.PDF_OUT, resume.pdfMetadata);
    }

    /**
     * Just console.log
     */
    say(msg:string) {
        console.log(`🗨️  ${msg}`);
    }
}
