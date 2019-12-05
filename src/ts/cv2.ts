import CVServer  from "./server";
import Browser from "./browser";
import reducePDF from "./reducePDF";
import setPDFMetadata from "./metadata";




export default class CV2 {

    server:CVServer;

    constructor(){
        this.server = new CVServer();
    }


    async render(data:any, path:string, metadata:any={}){

        this.sigintHandler();

        this.server.setData(data);

        await this.server.start();

        const browser = new Browser();

        await browser.render_pdf(`localhost:${this.server.port}`, path);

        // Reduce pdf size
        await reducePDF(path);

        // Set the metadata
        await setPDFMetadata(path, metadata);

        await this.server.stop();

    }



    async debug(data: any){

        this.sigintHandler();

        this.server.setData(data);

        await this.server.start(true);


    }


    sigintHandler(){

        process.on('SIGINT', async () => {

            console.log("Closing");
        
            try {
                if(this.server) await this.server.stop();
            } catch (e) {

            }


        
            console.log("Closed");
            
            process.exit();
        
        });

    }



}