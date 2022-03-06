import puppeteer from 'puppeteer';

/**
 * Class that opens a puppeteer browser to render a pdf
 */
export default class Browser {

    /**
     * Render a url into a pdf
     * @param url Url
     * @param path File path
     */
    async render_pdf(url:string, path:string){

        // Start puppeteer
        const browser = await puppeteer.launch({
            headless: true,
            handleSIGINT: false,
            args: ['--no-sandbox'] // For docker 
        });        
        const page = await browser.newPage();

        await page.goto(url, {
            waitUntil: "networkidle0"
        });

        await page.pdf({path, preferCSSPageSize:true});

        await browser.close();

    }
}
