

//
// Imports
//
import nunjucks from 'nunjucks';
import puppeteer from 'puppeteer';
import sass from 'sass';
import fs from 'fs';
import base64_img from './base64img';
import inlineSVG from './inlineSVG';


//
// Configure nunjucks
//
nunjucks.configure('src/templates', { autoescape: true });


/**
 * Base class for a CV
 */
export default class CV {

    HTML_OUT:string = 'dist/cv.html';
    PDF_OUT:string  = 'dist/cv.pdf';



    build(template:string, data:{}={}): Promise<void>{

        data = {
            ...data,
            base64_img,
            inlineSVG,
        };

        const html = this.render_html(template, data);
        return this.render_pdf(html);

    }

    private render_html(template:string, data:{}={}){

        console.log("Render html");

        //
        // Compile the scss of the templates
        //
        const sass_res = sass.renderSync({file: 'src/templates/style.scss'});
        const css_style = sass_res.css.toString();

        //
        // Render the template
        //
        const html = nunjucks.render( template + '.njk', {
            ...data,
            css_style,
            // base64_img // TODO adf
        });

        // Save to html
        fs.writeFileSync(this.HTML_OUT, html);

        return html;

    }



    private async render_pdf(html:string): Promise<void>{

        console.log("Render pdf");

        try {

            const browser = await puppeteer.launch({headless:true});
            const page = await browser.newPage();

            await page.setContent( html, {waitUntil:"networkidle0"});

            console.log('network iddle');

            // Wait a second
            await new Promise(r => setTimeout(r, 1000));

            await page.pdf({path:this.PDF_OUT, preferCSSPageSize:true});

            await browser.close();

        } catch(e){
            console.error(e);
            throw e;
        }

        return new Promise(r => r());

    }



}