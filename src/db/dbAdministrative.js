//const logger = require('../logger');
const { DbError } = require('../lib/errors');
const moduleManager = require('../models/moduleManager');


const logError = false;// error => logger.log({ level: 'verbose', message: error });

const forceDatabaseReset = async (sequelize) => {
    return new Promise(async (resolve, reject) => {
        try {
            await sequelize.getQueryInterface().dropAllTables({ logging: logError });

            await sequelize.sync({ force: true, logging: logError });

            await moduleManager.dissociateModels(sequelize);

            await moduleManager.seedTables(sequelize);

            // ? await moduleManager.associateModels(sequelize);

            resolve('Database reset was successful.');
        } catch (error) {
            console.debug(error);
            reject('Database reset has failed. Please contact the system administrator.');
            reject(new DbError('Database reset has failed. Please contact the system administrator.', error));
        }
    });
};

const databaseHealthCheck = async (sequelize) => {
    return new Promise(async function (resolve, reject) {
        const results = await Promise.allSettled(
            Object.values(sequelize.models)
                .filter(model => typeof model.count === "function")
                .map(async (model) => {
                    return {
                        table: model.getTableName(),
                        rows: await model.count()
                    };
                })
        );

        const tableCounts = results.filter(promise => promise.status === 'fulfilled')
            .reduce((obj, { value }) => (obj[value.table] = value.rows, obj), {});


        resolve({
            database: sequelize.getDatabaseName(),
            tables: tableCounts
        });
    });
};

const listModelActions = async (dbApi) => {
    const map = Object.values(dbApi.models)
        .map((model) => {

            const associations = model.associations;
            let accessors = {}; // 


            Object.values(associations).map((assoc) => {
                accessors = Object.getOwnPropertyNames(assoc).forEach(name => console.log(name, assoc[name]));
            });



            return { model: model.name, accessors: accessors, associations: associations };
        });
    return map;
};


module.exports.forceDatabaseReset = forceDatabaseReset;
module.exports.databaseHealthCheck = databaseHealthCheck;
module.exports.listModelActions = listModelActions;