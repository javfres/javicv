
const nunjucks = require('nunjucks');
const fs = require('fs');
const pdfpuppeteer = require("pdf-puppeteer");


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
        const callback = pdf => fs.writeFileSync(this.pdf_out, pdf);
    
        pdfpuppeteer(this.html, callback, pdfoptions);

    }


}



module.exports = JaviCV;
