//
// All imports
//
const nunjucks = require('nunjucks');
const fs = require('fs');
const pdfpuppeteer = require("pdf-puppeteer");
const setmetadata = require("./metadata");
const {
    remove_spaces,
    img_to_base64,
    inline_css,
    inline_svg,
} = require('./htmlutils');
const gradient = require('gradient-color').default;




//
// My CV class
//
class JaviCV {

    //
    // Constructor
    //
    constructor(){
                
        this.html = null;

        this.html_out = "dist/cv.html";
        this.pdf_out = "dist/cv.pdf";

        // Start nunjucks
        nunjucks.configure('src/html', { autoescape: true });
    } // constructor


    //
    // Generate both html and pdf
    //
    findJob(company = '???'){
        this.futureCompany = company + '??';
        this.build_html();
        return this.build_pdf();
    }

    //
    // Just console.log
    //
    say(msg){
        console.log(svg);
    }


    //
    // Build the thml
    //
    build_html(tofile = true){

        // Build the data neede for nunjucks
        let data = {

            // 96 pdi
            WIDTH: 794,
            HEIGHT: 1123,

            primary_color: 'rgb(65,65,65)',
            grey_color: 'rgb(115,115,115)',

            page_margins: 40,
            column_sep: 30,

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

            timeline_margin: 10,
            timeline_arrow_width: 20,

        };

        // Extra future job
        data.timeline.push({
            title: "",
            desc: this.futureCompany,
            icon: "chair",
            year: new Date().getFullYear()
        });
    
        // Page calculations
        data.INNER_WIDTH = data.WIDTH - data.page_margins*2;
        data.INNER_HEIGHT = data.HEIGHT - data.page_margins*2;
        data.column_width =  Math.floor(( data.INNER_WIDTH - data.column_sep*2 ) / 3);

        // Timeline calculations
        data.timeline_block_width = (data.INNER_WIDTH - data.timeline_margin*2) / data.timeline.length;
        data.timeline_gradient = gradient(["#a3ed9f", "#9ebdf3"], data.timeline.length+2);

        // Render the html
        this.html = nunjucks.render('index.html', {...data, debug:tofile});

        // Remove spaces between tags
        this.html = remove_spaces(this.html);

        // Imgs
        this.html = img_to_base64(this.html, false);
        this.html = inline_svg(this.html);

        // CSS
        this.html = inline_css(this.html);

        if(tofile) fs.writeFileSync(this.html_out, this.html);

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

} // JaviCV class


//
// Module exports
//
module.exports = JaviCV;
