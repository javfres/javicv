
//
// Imports
//
import CVServer  from "./server";
import Browser from "./browser";
import reducePDF from "./reducePDF";
import setPDFMetadata from "./metadata";
import { CVError } from "./types";


/**
 * Class that render a CV
 */
export default class CV2 {

    // Server
    server:CVServer = new CVServer();


    /**
     * Render
     * @param data Data object 
     * @param path Pdf path file
     * @param metadata Pdf metadata
     */
    async render(data:any, path:string, metadata:any={}){

        // Set the sigint handler
        this.sigintHandler();

        // Express server
        this.server.setData(data);
        await this.server.start();

        // Create a browser to render the pdf
        const browser = new Browser();
        await browser.render_pdf(`http://localhost:${this.server.port}`, path);

        // Reduce pdf size
        await reducePDF(path);

        // Set the metadata
        await setPDFMetadata(path, metadata);

        // The server is not needed anymore
        await this.server.stop();

    } // render


    /**
     * Debug mode where only the server is used
     * @param data 
     */
    async debug(data: any){

        console.log("Start in debug mode");

        // Set the sigint handler
        this.sigintHandler();

        // Express server
        this.server.setData(data);
        await this.server.start(true);

    } // debug


    /**
     * Define a sigint handler to close the server
     */
    sigintHandler(){

        process.on('SIGINT', async () => {

            console.log("Closing...");
        
            try {
                if(this.server) await this.server.stop();
                console.log("Closed");
            } catch (e) {
                throw new CVError("Unable to stop the server");
            }
            
            process.exit();
        
        });

    } // sigintHandler

}