const { ConfigNotDefinedError } = require('../lib/errors');


const envVars = {
    env: 'NODE_ENV',
    corsOrigin: 'CORS_ORIGIN', 
    expressPort: 'EXPRESS_PORT',  
    enableLogging: 'LOGGING', 
    mysqlHost: 'MYSQL_HOST', 
    mysqlPort: 'MYSQL_PORT',  
    mysqlDialect: 'MYSQL_DIALECT',  
    mysqlUser: 'MYSQL_USERNAME',  
    mysqlPass: 'MYSQL_PASSWORD',  
    mysqlDb: 'MYSQL_DB_NAME'
};


function AppConfig(appRootDirectory) {
    const getEnv = (key, ifUnset = null) => (process.env.hasOwnProperty(key)) ? process.env[key] : ifUnset;
    const requireEnv = (key) => {
        const value = getEnv(key);
        if (value !== null) return value;
    
        throw new ConfigNotDefinedError(`Required environment variable '${key}' is not set.`);
    };

    const appConfig = {};
    appConfig.rootdir = appRootDirectory || __dirname;
    appConfig.env = getEnv(envVars.env, 'production');
    appConfig.corsOrigin = getEnv(envVars.corsOrigin, 'http://localhost:3000');
    
    appConfig.expressPort = getEnv(envVars.expressPort, 8000);
    
    appConfig.enableLogging = getEnv(envVars.enableLogging, false);
    appConfig.logging = appConfig.enableLogging;

    appConfig.mysql = {
        host: requireEnv(envVars.mysqlHost),
        port: requireEnv(envVars.mysqlPort),
        dialect: requireEnv(envVars.mysqlDialect),
        username: requireEnv(envVars.mysqlUser),
        password: requireEnv(envVars.mysqlPass),
        database: requireEnv(envVars.mysqlDb),
        enableLogging: appConfig.enableLogging
    };
    appConfig.mysql.port = parseInt(appConfig.mysql.port);

    /* const emptyConfig = {
        env: 'production',
        rootdir: __dirname,
        logging: false,
        express: {
            port: 8000
        },
        cors: {
            origin: 'http://localhost:3000',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            preflightContinue: true,
        },
        mysql: {
            host: 'MYSQL_HOST',
            port: 'MYSQL_PORT',
            dialect: 'MYSQL_DIALECT',
            username: 'MYSQL_USERNAME',
            password: 'MYSQL_PASSWORD',
            database: 'MYSQL_DB_NAME'
        }
    }; */
    return appConfig;
};


module.exports = AppConfig;
module.exports.AppConfig = AppConfig;
module.exports.default = AppConfig;