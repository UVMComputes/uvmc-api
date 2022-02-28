const ModelError = require('./model.error');


class ModelUndefinedError extends ModelError {
    constructor(message, key) {
        super(message);

        this.key = key;
        this.message = message;
    }
};

module.exports = ModelUndefinedError;
module.exports.ModelUndefinedError = ModelUndefinedError;
module.exports.default = ModelUndefinedError;