const Sequelize = require('sequelize');
const DbError = require('./db.error');


class DbConnectionError extends DbError {
    // Accepts one, two, or zero arguments
    // new DbConnectionError(string, Error)
    // new DbConnectionError(Error)
    // new DbConnectionError()
    constructor(message, cause) {
        const error = (message instanceof Error) ? message : cause;
        let desc = 'Database connection failed.';

        if (error instanceof Sequelize.ConnectionError) {
            switch (true) {
                case error instanceof Sequelize.AccessDeniedError:
                    desc = 'Database connection failed due to insufficient privileges.';
                    break;
                case error instanceof Sequelize.ConnectionAcquireTimeoutError:
                    desc = 'Database connection not acquired due to timeout.';
                    break;
                case error instanceof Sequelize.ConnectionRefusedError:
                    desc = 'Database connection timeout.';
                    break;
                case error instanceof Sequelize.ConnectionTimedOutError:
                    desc = 'Database connection timeout.';
                    break;
                case error instanceof Sequelize.HostNotFoundError:
                    desc = 'Database host not found.';
                    break;
                case error instanceof Sequelize.HostNotReachableError:
                    desc = 'Database host not reachable.';
                    break;
                case error instanceof Sequelize.InvalidConnectionError:
                    desc = 'Invalid database connection.';
                    break;
                default:
                    desc = 'An unknown database connection occurred.';
                    break;
            }
        }

        if (typeof message === 'string') desc = message;

        super(desc, error);
        this.myCause = cause;
        this.myError = error;

        this.statusCode = 502;
        this.name = 'DatabaseConnectionError';
    }
};

module.exports = DbConnectionError;
module.exports.DbConnectionError = DbConnectionError;
module.exports.default = DbConnectionError;