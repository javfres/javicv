
import http from 'http';
import express, {Application} from 'express';
import nunjucks from 'nunjucks';
import sass from 'sass';
import { CVError } from './types';



export default class Server {

    public static readonly DEV_PORT = 4444;

    //
    // Attributes
    //
    app: Application|null = null;
    server:http.Server|null = null;
    data: any = null;
    port: number = 0;

    async start(debug=false){

        nunjucks.configure('src/templates/', { autoescape: true, noCache:true });

        this.app = express();

        if(debug){
            this.server = await this.app.listen(Server.DEV_PORT);
        } else {
            this.server = await this.app.listen();
        }

        this.init_routes();

        const addr = this.server.address();
        if(addr && typeof addr !== 'string'){
            this.port = addr.port;
        } else {
            throw new CVError("Unable to launch server");
        }


    }


    async stop(){

        if(this.server) await this.server.close();

    }

    setData(data:any){
        this.data = data;
    }


    init_routes(){

        if(!this.app){
            throw new CVError("No express app");
        };

        this.app.get('/', (req, res) => {

            console.log("jajaj");

            if(!this.data){
                res.send("No data");
                return;
            }

            const html = nunjucks.render('index.njk', this.data);
            res.send(html);
        });

        
        this.app.get('/style.css', (req, res) => {

            res.setHeader('Content-Type', 'text/css');

            sass.render({file: 'src/style/main.scss'}, (err, sass_res) => {

                if(err){
                    console.error(err);
                    res.send(err);
                    return;
                }

                const out = sass_res.css.toString();
                res.send(out);

            });

        });

        this.app.use('/icons', express.static('src/icons'));
        this.app.use('/imgs', express.static('src/imgs'));

    }



} 