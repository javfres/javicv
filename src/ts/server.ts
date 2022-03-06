
import http from 'http';
import express, {Application} from 'express';
import nunjucks from 'nunjucks';
import sass from 'sass';
import { CVError } from './cverror';
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
    data?: object;
    port = 0;

    /**
     * Start a express server
     * @param debug If true, sets a given port instead a random one
     */
    async start(debug=false) {

        // Init the template library
        const env = nunjucks.configure( __dirname + '/../../src/templates/', {
            autoescape: true,
            noCache:true
        });

        env.addFilter('is_string', function(obj) {
            return typeof obj == 'string';
        });

        //
        // Create the server
        //
        this.app = express();

        if (debug) {
            console.log(`http://localhost:${Server.DEV_PORT}`);
            this.server = this.app.listen(Server.DEV_PORT);
        } else {
            this.server = this.app.listen();
        }

        this.initRoutes();

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
    async stop() {

        if (this.server) {
            this.server.close();
        }

    }

    /**
     * Set the data used in the template library
     */
    setData(data: object) {
        this.data = data;
    }

    /**
     * Define the routes
     */
    initRoutes() {

        // Check the app is running
        if (!this.app) {
            throw new CVError("No express app");
        }

        // Default route
        this.app.get('/', (req, res) => {

            if (!this.data) {
                res.send("No data");
                return;
            }

            const html = nunjucks.render('index.njk', {
                ...this.data,
                inlineSVG
            });
            
            res.send(html);
        });

        // The style
        this.app.get('/style.css', async (req, res) => {

            const path = __dirname + '/../../src/style/main.scss';

            try {
                const sassResult = await sass.compileAsync(path);
                res.setHeader('Content-Type', 'text/css');
                res.send(sassResult.css);
            } catch (e) {
                const msg = e instanceof Error ? e.message : 'SCSS Error';
                res.status(500).send(msg);
            }
        });

        // Static imgs route
        this.app.use('/imgs', express.static(  __dirname + '/../../src/imgs'));

    }
} 
