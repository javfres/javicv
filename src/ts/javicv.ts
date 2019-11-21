//
// All imports
//

/*
const nunjucks = require('nunjucks');
const fs = require('fs');
const setmetadata = require("./metadata");
const {
    remove_spaces,
    img_to_base64,
    inline_css,
    inline_svg,
} = require('./htmlutils');
const gradient = require('gradient-color').default;
*/

import CV from './cv';

//
// My CV class
//
export default class JaviCV extends CV {

    //
    // Generate both html and pdf
    //
    findJob(company:string = ''): Promise<void> {

        const futureCompany = company ? (company+'??') : '???';

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
            year: "" + new Date().getFullYear()
        });

        return this.build('index', data);
    }

    //
    // Just console.log
    //
    say(msg:string){
        console.log(msg);
    }



    /*
  

    //
    // Build the thml
    //
    build_html(tofile = true){


    
        // Page calculations
        data.INNER_WIDTH = data.WIDTH - data.page_margins*2;
        data.INNER_HEIGHT = data.HEIGHT - data.page_margins*2;
        data.column_width =  Math.floor(( data.INNER_WIDTH - data.column_sep*2 ) / 3);

        // Timeline calculations
        data.timeline_block_width = (data.INNER_WIDTH - data.timeline_margin*2) / data.timeline.length;
        data.timeline_gradient = gradient(["#a3ed9f", "#9ebdf3"], data.timeline.length+2);

    } // build_html


    //
    // Build the pdf
    //
    build_pdf(){

        // Generate first the html
        this.build_html(false);

        // Pdf puppeteer options
        const pdfoptions = {
            printBackground: true,
            preferCSSPageSize: true,
        }

        // Return a promise
        return new Promise((resolve, reject) => {
           
            // Callback for the pdfpuppeteer
            const callback = pdf => {
                fs.writeFileSync(this.pdf_out, pdf);
                this.set_metadata();

                if(pdf) {
                    resolve();
                } else {
                    reject();
                }
            }
        
            // Call pdf pupetter
            pdfpuppeteer(this.html, callback, pdfoptions);

        }).catch(() => {
            console.error("Ummmm, it didn't work");
        });

    } // build_pdf


    //
    // Set the medata
    //
    set_metadata(){

        setmetadata(this.pdf_out, {
            'Subject': 'Resume',
            'Title': 'CV Javier Fresno',
            Author: 'Javier Fresno',
            'Keywords+': [ 'Software engineer', 'PhD Computer Science', 'Full stack' ],
        });
    } // set_metadata

    */

} // JaviCV class