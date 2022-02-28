const { COLUMN_PK } = require('./commonAttributes');
const jsonUtils = require('../utils/jsonUtils');
const modelDaoAdapter = require('../model-helpers/modelDaoAdapter');
const { ModelError } = require('../errors');

const defineModel = (modelName, columns, options = {}) => {

    const { seedData, defaultScope, actions, addAssociations, addScopes } = options;

    const _options = {};
    if (defaultScope) _options.defaultScope = defaultScope;

    const _attributes = (colDefs => {
        return {
            id: { ...COLUMN_PK },
            ...colDefs
        };
    })(columns);

    const seedArray = (seed => {
        if (Array.isArray(seed) && seed.length > 0) return seed.map(see => see = jsonUtils.simplify(see));
        else if (typeof seed === 'object') return [jsonUtils.simplify(seed)];

        return false;
    })(seedData);

    const bindActions = (actionMap => {
        if (actionMap && typeof actionMap === 'object') {
            return (Model, models) => {
                Object.keys(actionMap).forEach(key => {
                    Model[key] = actionMap[key](models);
                });
            }
        }

        return false;
    })(actions);

    const createForeignKeys = (associate => {
        return (associate && typeof associate === 'function') ? associate : false;
    })(addAssociations);

    // Model Init Method
    return (sequelize) => {
        _options.sequelize = sequelize;

        const Model = sequelize.define(modelName, _attributes, _options);

        Model.__consoleLog = () => console.dir(Model);

        Model.actions = modelDaoAdapter(modelName);

        Model.__seed = () => new Promise(async (resolve, reject) => {
            try {
                if (!seedArray) resolve(`No seed data set for the ${Model.name} table.`);

                // Model.bulkCreate(seedArray)
                //     .then(result => resolve(`Table ${Model.name} successfully seeded.`))
                //     .catch(reject);

                const saved = await Model.bulkCreate(seedArray);
                resolve(`Table ${Model.name} successfully seeded.`);

            } catch (error) {
                console.debug(error);
                throw new ModelError(`Failed to seed ${Model.name} model.`, error);
            }
        });

        Model.__associate = async (models) => {
            try {
                if (createForeignKeys) {
                    // https://sequelize.org/master/class/lib/associations/base.js~Association.html
                    // Creating associations in sequelize is done by calling 
                    // belongsTo / hasOne / hasMany / belongsToMany 
                    // functions on a model (the source), and providing another 
                    // model as the first argument to the function (the target).
                    //
                    // Creating an association will add a foreign key constraint to the attributes. 
                    // All associations use CASCADE on update and SET NULL on delete, 
                    // except for n:m, which also uses CASCADE on delete.
                    //
                    // example:
                    // Source.hasMany(Target, options)
                    createForeignKeys(Model, models);
                }

                if (bindActions) {
                    bindActions(Model, models);
                }

                return `Table ${Model.name} associated successfully.`;
            } catch (error) {
                console.debug(error);
                throw new ModelError(`Failed to associated ${Model.name} model.`, error);
            }
        };
        
        Model.__disassociate = async (models) => {
            const { sequelize, tableName } = Model;
            const fks = await sequelize.queryInterface.getForeignKeyReferencesForTable(tableName);
            const results = await Promise.allSettled(
                Object.values(fks).map(async (assoc) => {
                    return await sequelize.queryInterface.removeConstraint(tableName, assoc.constraintName)
                }));

            const failed = Object.values(results).filter(result => result.status === 'rejected');

            return (failed.length <= 0) ?
                Promise.resolve(`Table ${tableName} dissociated successfully.`) :
                Promise.reject(new ModelError(`Error: Table ${tableName} failed to remove '${failed.length}' constraints.`, failed));

        };

        // Object.assign(Model, actionMixins);

        /////console.dir(Model);
        return Model;
    };

};

defineModel.define = defineModel;
defineModel.defineModel = defineModel;



module.exports = defineModel;
module.exports.default = defineModel;