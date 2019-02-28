
const nunjucks = require('nunjucks');
const fs = require('fs');

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


}



module.exports = JaviCV;
