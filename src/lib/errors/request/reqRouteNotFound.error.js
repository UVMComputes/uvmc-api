const BaseError = require('../base.error');


class ReqRouteNotFoundError extends BaseError {
    constructor(req) {
        super(`${req.method} ${req.path} is not defined`);
        
        this.name = 'RouteNotFoundError';
        this.statusCode = 404;
        this.method = req.method;
        this.path = req.path;
    }
    get() {
        return this.toString();
    }
};

ReqRouteNotFoundError.routeHandler = (req, res) => {
    throw new ReqRouteNotFoundError(req);
};

module.exports = ReqRouteNotFoundError;
module.exports.ReqRouteNotFoundError = ReqRouteNotFoundError;
module.exports.default = ReqRouteNotFoundError;