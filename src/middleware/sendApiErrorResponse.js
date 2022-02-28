const { BaseError } = require('../lib/errors')
const httpStatus = require('../lib/utils/httpResponseStatus');
const { isEmpty } = require('../lib/utils/validationHelper');



const errorHandler = () => {
    // https://expressjs.com/en/guide/error-handling.html
    return (error, req, res, next) => {
        // If this isn't an ApiError recursively call this errorHandler again
        // by throwing a ApiError containing this error.
        // That way all returned errors are ApiError's for consistency.
        if (!(error instanceof BaseError)) {
            error = new BaseError('Api error occurred.', error);
        }

        let status = httpStatus.defaultError;
        if(res.headersSent && res.statusCode) {
            status = httpStatus.getError(res.statusCode);
        } else if(error.hasOwnProperty('statusCode')) {
            status = httpStatus.getError(error.statusCode);
        }

        const { body, params, query } = req;
        const responsePayload = {
            error: error.get(),
            verbose: error.verbose(),
            http: status,
            req: { body, params, query }
        };

        res.status(status.code).json(responsePayload);
    };
};



module.exports = errorHandler;
module.exports.errorHandler = errorHandler;