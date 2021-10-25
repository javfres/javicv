
//
// Imports
//
import CV2 from './cv2';
import fs from 'fs';


/**
 * My CV class
 */
export default class JaviCV extends CV2 {

    static readonly PDF_OUT:string = 'cv.pdf';

    /**
     * Generate both html and pdf
     */
    async findJob(company: string|null, year: number, debug=false) {


        const strData = fs.readFileSync('./src/data.ts', 'utf8');
        let data:any = {timeline: []};

        try {
            data = eval(strData);
        } catch(e){
            console.error("Invalid Data");
        }


        // Optional name of the company
        if(company !== null) {

            const futureCompany = company ? (company+'??') : '???';

            // Extra future job
            data.timeline.push({
                title: "",
                desc: futureCompany,
                icon: "chair",
                year: "" + year
            });
        }

        if(debug){
            await this.debug(data);
        }

        await this.render(data, JaviCV.PDF_OUT, data.pdf_metadata);
    }

    /**
     * Just console.log
     */
    say(msg: string): void {
        console.log(`🗨️  ${msg}`);
    }


} // JaviCV class