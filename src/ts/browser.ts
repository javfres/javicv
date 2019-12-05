import puppeteer from 'puppeteer';


export default class Browser {



    async render_pdf(url:string, path:string){

        // Start puppeteer
        const browser = await puppeteer.launch({
            headless: true,
            // handleSIGINT: false,
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