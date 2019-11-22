
//
// Imports
//
import nunjucks from 'nunjucks';
import puppeteer from 'puppeteer';
import sass from 'sass';
import fs from 'fs';
import base64_img from './base64img';
import inlineSVG from './inlineSVG';
import setPDFMetadata from './metadata';

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


    /**
     * Build a pdf
     * @param template The nunjuncks template
     * @param data     Data passed to the template
     * @param metadata Metadata of the final pdf
     */
    build(template:string, data:{}={}, metadata:{}={}): Promise<void>{

        // Extend the data object with extra functions we need
        data = {
            ...data,
            base64_img,
            inlineSVG,
        };

        // Render both the html and then the pdf
        const html = this.render_html(template, data);
        return this.render_pdf(html, metadata);

    }

    /**
     * Rendes a nunjucks html template
     * @param template The name of the template
     * @param data Data passed to the template
     */
    private render_html(template:string, data:{}={}){

        //
        // Compile the scss of the templates
        //
        const sass_res = sass.renderSync({file: 'src/templates/style.scss'});
        const css_style = sass_res.css.toString();

        //
        // Render the template
        //
        const html = nunjucks.render(template + '.njk', {
            ...data,
            css_style,
        });

        // Save to html
        fs.writeFileSync(this.HTML_OUT, html);

        return html;

    }

    /**
     * A simple wait promise
     * @param ms Milliseconds
     */
    private async wait(ms:number=1000){
        await new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Call puppeteer to render the html into a pdf
     * @param html The html
     * @param metadata The pdf metadada
     */
    private async render_pdf(html:string, metadata:{}={}): Promise<void>{

        // Start puppeteer
        const browser = await puppeteer.launch({headless:true});
        const page = await browser.newPage();

        // Load the content
        // Is important to wait until all the elements have been loaded
        await page.setContent( html, {waitUntil:"networkidle0"});
        await this.wait(); // Just in case

        await page.pdf({path:this.PDF_OUT, preferCSSPageSize:true});
        await this.wait(); // Just in case

        // Close puppet
        await browser.close();

        // Set the metadata
        await setPDFMetadata(this.PDF_OUT, metadata);

    }

}