const Sequelize = require('sequelize');
const { DbConnectionError, ModelUndefinedError } = require('../lib/errors')

function DataApi(sequelize) {
    if(!(sequelize instanceof Sequelize)) throw DbConnectionError("Invalid connection object.");
    
    const api = {};
    api.sequelize = sequelize;
    api.models = sequelize.models;

    api.model = (moduleName) => {
        if (sequelize.isDefined(moduleName)) return sequelize.model(moduleName)
        throw new ModelUndefinedError(`Model '${moduleName}' is undefined.`)
    }

    return api;
}

module.exports = DataApi;
module.exports.DataApi = DataApi;
module.exports.default = DataApi;