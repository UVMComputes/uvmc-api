
module.exports.BaseError = require('./base.error');
module.exports.Error = require('./base.error');

module.exports.ConfigNotDefinedError = require('./configuration/configNotDefined.error');

module.exports.DbError = require('./database/db.error');
module.exports.DbConfigurationError = require('./database/dbConfiguration.error');
module.exports.DbConnectionError = require('./database/dbConnection.error');

module.exports.ModelError = require('./model/model.error');
module.exports.ModelUndefinedError = require('./model/modelUndefined.error');
module.exports.ModelValidationError = require('./model/modelValidation.error');

module.exports.ReqRouteNotFoundError = require('./request/reqRouteNotFound.error');
