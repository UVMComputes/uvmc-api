const Sequelize = require('sequelize');

const { Error, DbConfigurationError, DbConnectionError } = require('../lib/errors');

const getSequelizeOptions = (appConfig) => {
    try {
        const { username, password, database, host, port, dialect, logging } = appConfig.mysql;
        if (!host) { throw new Error("DB Config missing host."); }
        if (!dialect) { throw new Error("DB Config missing dialect."); }
        if (!username) { throw new Error("DB Config missing username."); }
        if (!password) { throw new Error("DB Config missing password."); }
        if (!database) { throw new Error("DB Config missing database."); }

        return { username, password, database, host, port, dialect, logging };
    } catch (error) {
        throw new DbConfigurationError("Database configuration is invalid.", error, appConfig);
    }
};

const connect = (options) => {
    try {
        // New Sequelize connection
        // https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor
        const sequelize = new Sequelize({
            ...options,
            
            define: { // Default options for model definitions.
                timestamps: true,     // Adds createdAt and updatedAt timestamps to the model.
                underscored: true,    // Add underscored field to all attributes.
            },
            // query: { // Default options for sequelize.query
            //     nest: true, TODO: Throws errors
            // },
        });
    
        return sequelize;
    } catch (error) {
        throw new DbConnectionError(error);
    }
};

const init = async (appConfig) => {
    try {
        const connOptions = getSequelizeOptions(appConfig);
        const connection = connect(connOptions);
    
        await connection.authenticate();

        return Promise.resolve(connection);
    } catch (error) {
        return Promise.reject(error);
    }
};


module.exports = init;
module.exports.init = init;
module.exports.default = init;