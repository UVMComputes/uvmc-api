const Sequelize = require('sequelize');
const DbError = require('./db.error');


class DbConfigurationError extends DbError {
    constructor(message, cause) {
        if(message instanceof Error) {
            super(message.toString(), message);
        } else {
            super(message || 'Database configuration is invalid.', cause);
        }

        this.statusCode = 503;
        this.name = 'InvalidDatabaseConfigurationError';
    }
};

module.exports = DbConfigurationError;
module.exports.DbConfigurationError = DbConfigurationError;
module.exports.default = DbConfigurationError;