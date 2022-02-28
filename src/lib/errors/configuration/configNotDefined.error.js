const BaseError = require('../base.error');


class ConfigNotDefinedError extends BaseError {
    constructor(message, key) {
        super(message);

        this.key = key;
        this.message = message;

        this.statusCode = 504;
        this.name = 'DatabaseError';
    }
};

module.exports = ConfigNotDefinedError;
module.exports.ConfigNotDefinedError = ConfigNotDefinedError;
module.exports.default = ConfigNotDefinedError;