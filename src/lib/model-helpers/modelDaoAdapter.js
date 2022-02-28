const Sequelize = require('sequelize');
const _ = require('lodash');

const { DbModelValidationError, DbModelError } = require('../errors');



const createModelDao = (modelName, singular) => {
    const _singular = (Model) => _.toLower(Model.name.singular);
    const _plural = (Model) => _.toLower(Model.name.plural);

    const getWhere = (dbApi, where = {}) => {
        return new Promise((resolve, reject) => {
            const Model = dbApi.model(modelName);
            
            Model.findAll({
                where
            }).then(found => {

                resolve(found);
                
            }).catch(error => {
                reject(new DbModelError(`Unable to find ${Model.name} by that id.`, error));
            });
        });
    };

    const getById = (dbApi, id) => {
        return new Promise((resolve, reject) => {
            const Model = dbApi.model(modelName);
            
            Model.findByPk(id).then(found => {

                resolve(found);

            }).catch(error => {
                reject(new DbModelError(`Unable to find ${Model.name} by that id.`, error));
            });
        });
    };

    const create = (dbApi, data) => {
        return new Promise((resolve, reject) => {
            const Model = dbApi.model(modelName);
            Model.create(data).then(newRecord => {

                return getById(dbApi, newRecord.id);

            }).catch(error => {
                if (error instanceof Sequelize.ValidationError) {
                    reject(new DbModelValidationError(`Unable to create new ${Model.name}.`, error));
                } else {
                    reject(new DbModelError(`Unable to create new ${Model.name}.`, error));
                }
            });
        });
    };

    const update = (dbApi, id, data) => {
        return new Promise((resolve, reject) => {
            const Model = dbApi.model(modelName);

            Model.findByPk(id).then(found => {
                found.update(data).then(saved => {
                    resolve({ success: true, id: id, previous: found, [singular]: saved });
                }).catch(error => {
                    reject(new DbModelError(`Unable to update ${Model.name} by that id.`, error));
                });
            }).catch(error => {
                reject(new DbModelError(`Unable to find ${Model.name} by that id.`, error));
            });

        });
    };

    const destroy = (dbApi, id, req) => {
        return new Promise((resolve, reject) => {
            const Model = dbApi.model(modelName);
            Model.destroy({ 
                where: { id: id },
                limit: 1
            }).then(found => {
                resolve({ success: true, id: id, [singular]: found });
            }).catch(error => {
                reject(new DbModelError(`Unable to delete ${Model.name} by that id.`, error));
            });
        });
    };
    

    return {
        create,
        update,
        delete: destroy,
        getById,
        getWhere,
        [`create${modelName}`]: create,
        [`update${modelName}`]: update,
        [`delete${modelName}`]: destroy,
        [`get${modelName}ById`]: getById,
        [`get${modelName}Where`]: getWhere,
    };
};



module.exports = createModelDao;
module.exports.createModelDao = createModelDao;
module.exports.default = createModelDao;