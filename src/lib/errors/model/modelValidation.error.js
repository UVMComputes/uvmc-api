const ModelError = require('./model.error');


class ModelValidationError extends ModelError {
    constructor(message, key) {
        super(message);

        this.key = key;
        this.message = message;
    }
};

module.exports = ModelValidationError;
module.exports.ModelValidationError = ModelValidationError;
module.exports.default = ModelValidationError;