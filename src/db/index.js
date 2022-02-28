const DataApi = require('./DataApi');
const dbConn = require('./dbConn');
// const dbModels = require('./dbModels');
const moduleManager = require('../models/moduleManager');


const init = async (appConfig) => {
    try {
        const connection = await dbConn.init(appConfig);

        const conn = await moduleManager.loadModels(connection).then(moduleManager.associateModels);
    
        const dbApi = new DataApi(conn);

        return Promise.resolve(dbApi);
    } catch (error) {
        return Promise.reject(error);
    }
};


module.exports = init;
module.exports.init = init;
module.exports.default = init;