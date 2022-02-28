const filterRequestPaging = () => {
    return (req, res, next) => {

        const { body, params, query } = req;

        let page = query.page || 1;
        page = params.page || page;
        page = body.page || page;
        page = parseInt(page);

        let limit = query.limit || 100;
        limit = params.limit || limit;
        limit = body.limit || limit;
        limit = parseInt(limit);

        let offset = (page - 1) * limit;

        req.paging = { page, limit, offset };
        next();
    };
};


module.exports = filterRequestPaging;
module.exports.filterRequestPaging = filterRequestPaging;
module.exports.default = filterRequestPaging;