const db = require('../db');


const makeDatabaseConnection = () => {
    return (req, res, next) => {
        db.init(req.app.get('config'))
            .then(dbApi => {
                req.dbApi = dbApi;
                next();
            }).catch(next);
    };
};


module.exports = makeDatabaseConnection;
module.exports.makeDatabaseConnection = makeDatabaseConnection;
module.exports.default = makeDatabaseConnection;