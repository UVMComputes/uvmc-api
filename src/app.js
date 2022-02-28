/** 
 * Express App
 * 
 * @module express-app 
 * @category ExpressApp
 * @desc A configured ExpressJS App to be launched by the server.
 * 
 * @example
 * 
 * Basic Usage: 
 * http://expressjs.com/en/api.html#app.listen
 * 
 * ```
 * require('./express-app').listen(3000);
 * ```
 * 
 * Serverless:
 * https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html
 * 
 * ```
 * const serverless = require('serverless-http');
 * module.exports.handler = serverless(require('./express-app'));
 * ```
 * 
 */
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const moment = require('moment');
const responseTime = require('response-time');
const path = require('path');
const favicon = require('serve-favicon');


const makeDatabaseConnection = require('./middleware/makeDatabaseConnection');
const sendApiErrorResponse = require('./middleware/sendApiErrorResponse');

const appRouter = require('./routers');

const appConfig = require('./config');

// TODO: http://expressjs.com/en/advanced/best-practice-performance.html
const initApp = (nodeEnv) => {

    try {
        // TODO:        Configure node Environment Variables for your
        // REVIEW:      See the config file for a list of use variables.
        const config = appConfig(__dirname, nodeEnv);

        var app = express();

        // Records the response time for requests in HTTP servers.
        // http://expressjs.com/en/resources/middleware/response-time.html
        app.use(responseTime());

        app.set('env', config.env);
        app.set('config', config);

        // Help secure Express apps with various HTTP headers
        // https://github.com/helmetjs/helmet
        //app.use(helmet());

        // CORS is a node.js package for providing a Connect/Express middleware 
        // that can be used to enable CORS with various options.
        // https://github.com/expressjs/cors
        // https://expressjs.com/en/resources/middleware/cors.html
        // const corsConfig = {
        //     origin: '*',
        //     methods: '*',
        //     //preflightContinue: false,
        //     credentials: true,
        // };
        // app.options('*', cors(corsConfig)) // include before other routes

        /* const allowCrossDomain = function(req, res, next) {
            res.header('Access-Control-Allow-Origin', "*");
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            //res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        };
        app.use(allowCrossDomain); */
        app.use(cors());

        // Disables the 'X-Powered-By: Express' HTTP header.
        app.set('x-powered-by', false);

        // Force pretty print on the response json
        app.set('json spaces', 4);

        // Serve favicon on GET requests (stops a warning)
        app.use(favicon(path.join(config.rootdir, 'public', 'images', 'favicon.ico')));

        // Adds `dbApi` to the `req` object to be use through the app
        app.use(makeDatabaseConnection());

        // Parses incoming requests with `application/x-www-form-urlencoded` payloads.
        // http://expressjs.com/en/5x/api.html#express.urlencoded
        app.use(express.urlencoded({ extended: false }));

        // Parses incoming requests with `application/json` payloads.
        // http://expressjs.com/en/5x/api.html#express.json
        app.use(express.json());


        app.use(appRouter);


        // Error Handling Middleware
        // Catches any Error objects passed to the `next` method
        app.use(sendApiErrorResponse());

        return app;

    } catch (error) {
        console.error('Unable to launch app: ', error.toString());
        process.exit(1);
    }
};


const serverListen = (nodeEnv = 'local') => {
    const app = initApp(nodeEnv);
    const config = app.get('config');

    return app.listen(config.expressPort, (error) => {
        if (error) {
            console.error('Unable to connect the server: ', error.toString());
            process.exit(1);
        }
        console.log(`  --- UVM Computes API Is Available: http://localhost:${config.expressPort}`);
        console.log(`  --- Application running in ${config.env} mode.`);
    });
};



module.exports = initApp;
module.exports.initApp = initApp;
module.exports.serverListen = serverListen;
module.exports.default = initApp;