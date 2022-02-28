const Sequelize = require('sequelize');
const BaseError = require('../base.error');


class ModelError extends BaseError {
    constructor(message, error) {
        super(message, error);

        this.statusCode = 500;
        this.name = 'DataModelError';
    }
};

module.exports = ModelError;
module.exports.ModelError = ModelError;
module.exports.default = ModelError;