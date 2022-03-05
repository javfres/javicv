
import http from 'http';
import express, {Application} from 'express';
import nunjucks from 'nunjucks';
import sass from 'sass';
import { CVError } from './types';
import inlineSVG from './inlineSVG';


/**
 * This is an express server to handle all the resources needed to render the pdf
 */
export default class Server {

    // Default debug port
    public static readonly DEV_PORT = 4444;

    //
    // Attributes
    //
    app: Application|null = null;
    server:http.Server|null = null;
    data: any = null;
    port: number = 0;

    /**
     * Start a express server
     * @param debug If true, sets a given port instead a random one
     */
    async start(debug=false){

        // Init the template library
        nunjucks.configure( __dirname + '/../../src/templates/', { autoescape: true, noCache:true });

        //
        // Create the server
        //
        this.app = express();

        if(debug){
            console.log(`http://localhost:${Server.DEV_PORT}`);
            this.server = this.app.listen(Server.DEV_PORT);
        } else {
            this.server = this.app.listen();
        }

        this.init_routes();

        //
        // Get the used port
        //
        const addr = this.server.address();
        if(addr && typeof addr !== 'string'){
            this.port = addr.port;
        } else {
            throw new CVError("Unable to launch server");
        }

    } // start


    /**
     * Stop the server
     */
    async stop(){

        if(this.server) this.server.close();

    }

    /**
     * Set the data used in the template library
     * @param data 
     */
    setData(data:any){
        this.data = data;
    }

    /**
     * Define the routes
     */
    init_routes(){

        // Check the app is running
        if(!this.app){
            throw new CVError("No express app");
        };

        // Default route
        this.app.get('/', (req, res) => {

            if(!this.data){
                res.send("No data");
                return;
            }

            const html = nunjucks.render( 'index.njk', {
                ...this.data,
                inlineSVG
            });
            res.send(html);
        });

        // The style
        this.app.get('/style.css', (req, res) => {

            res.setHeader('Content-Type', 'text/css');

            sass.render({file:  __dirname + '/../../src/style/main.scss'}, (err, sass_res) => {

                if(err){
                    console.error(err);
                    res.send(err);
                    return;
                }

                if (!sass_res) {
                    return;
                }

                const out = sass_res.css.toString();
                res.send(out);

            });

        });

        // Static imgs route
        this.app.use('/imgs', express.static(  __dirname + '/../../src/imgs'));

    } // init_routes

} 