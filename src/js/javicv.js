
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

class JaviCV {

    constructor(){
        this.html = null;

        this.html_out = "dist/cv.html";
        this.pdf_out = "dist/cv.pdf";

        nunjucks.configure('src/html', { autoescape: true });

    }

    build_html(tofile = true){

        let data = {
            // 96 pdi
            WIDTH: 794,
            HEIGHT: 1123,

            primary_color: 'rgb(65,65,65)',

            //primary_color: 'rgb(165,65,65)',

            grey_color: 'rgb(115,115,115)',

            page_margins: 40,
            column_sep: 30,
        };

        data.INNER_WIDTH = data.WIDTH - data.page_margins*2;
        data.INNER_HEIGHT = data.HEIGHT - data.page_margins*2;
        data.column_width =  Math.floor(( data.INNER_WIDTH - data.column_sep*2 ) / 3);

        
        this.html = nunjucks.render('index.html', {...data, debug:tofile});

        // Remove spaces between tags
        this.html = remove_spaces(this.html);

        // Imgs
        this.html = img_to_base64(this.html, false);
        this.html = inline_svg(this.html);

        // CSS
        this.html = inline_css(this.html);

        if(tofile){
            fs.writeFileSync(this.html_out, this.html);
        }

    }



    build_pdf(){

        this.build_html(false);

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
