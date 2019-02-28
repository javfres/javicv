
const nunjucks = require('nunjucks');
const fs = require('fs');
const pdfpuppeteer = require("pdf-puppeteer");
const setmetadata = require("./metadata");


class JaviCV {

    constructor(debug = false){
        this.html = null;
        this.debug = debug;

        this.html_out = "dist/cv.html";
        this.pdf_out = "dist/cv.pdf";

        nunjucks.configure('src/html', { autoescape: true });

    }

    build_html(){

        const data = {};

        this.html = nunjucks.render('index.html', {...data, debug:this.debug});

        fs.writeFileSync(this.html_out, this.html);


    }

    build_pdf(){

        const pdfoptions = {
            printBackground: true,
            preferCSSPageSize: true,
        }
        const callback = pdf => {
            fs.writeFileSync(this.pdf_out, pdf);
            this.set_metadata();
        }
    
        pdfpuppeteer(this.html, callback, pdfoptions);

    }


    set_metadata(){

        setmetadata(this.pdf_out, {
            'Subject': 'Resume',
            'Title': 'CV Javier Fresno',
            Author: 'Javier Fresno',
            'Keywords+': [ 'Software engineer', 'PhD Computer Science', 'Full stack' ],
        });
    }


}



module.exports = JaviCV;
