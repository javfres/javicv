
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

class JaviCV {

    constructor(){
                
        this.html = null;

        this.html_out = "dist/cv.html";
        this.pdf_out = "dist/cv.pdf";

        nunjucks.configure('src/html', { autoescape: true });

    }

    findJob(company = '???'){
        this.futureCompany = company + '??';
        this.build_html();
        return this.build_pdf();
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

        data.timeline.push({
            title: "",
            desc: this.futureCompany,
            icon: "chair",
            year: new Date().getFullYear()
        });
    



        data.INNER_WIDTH = data.WIDTH - data.page_margins*2;
        data.INNER_HEIGHT = data.HEIGHT - data.page_margins*2;
        data.column_width =  Math.floor(( data.INNER_WIDTH - data.column_sep*2 ) / 3);


        data.timeline_block_width = (data.INNER_WIDTH - data.timeline_margin*2) / data.timeline.length;
        data.timeline_gradient = gradient(["#a3ed9f", "#9ebdf3"], data.timeline.length+2);

        //  "#e09df4"

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

        return new Promise((resolve, reject) => {
           
            const callback = pdf => {
                fs.writeFileSync(this.pdf_out, pdf);
                this.set_metadata();

                if(pdf) {
                    resolve();
                } else {
                    reject();
                }
            }
        
            pdfpuppeteer(this.html, callback, pdfoptions);

        });

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
