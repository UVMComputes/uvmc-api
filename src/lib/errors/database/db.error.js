const Sequelize = require('sequelize');
const BaseError = require('../base.error');


class DbError extends BaseError {
    constructor(message, error) {
        super(message || 'A database error occurred.', error);

        if (error instanceof Sequelize.BaseError) {
            this.sequelizeError = error;
        }

        this.statusCode = 501;
        this.name = 'DatabaseError';
    }
};

module.exports = DbError;
module.exports.DbError = DbError;
module.exports.default = DbError;