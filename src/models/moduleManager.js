
const modelConstructors = [
    require('./project'),
    require('./projectJob'),
    require('./projectJobFile'),
    require('./projectJobTask'),
    require('./researcher'),
    require('./securityLevel'),
    require('./securityToken'),
    require('./user')
];


const loadModels = (sequelize) => {
    return new Promise(async function (resolve, reject) {
        try {
            for (const modelInit of modelConstructors) {
                modelInit(sequelize);
            }
            resolve(sequelize);
        } catch (error) {
            reject(error);
        }
    });
};

const seedTables = async (sequelize) => {
    return new Promise(async function (resolve, reject) {
        const results = await Promise.allSettled(
            Object.values(sequelize.models)
                .filter(model => typeof model.__seed === "function")
                .map(async (model) => await model.__seed())
        );

        const failed = Object.values(results).filter(result => result.status === 'rejected');

        return (failed.length <= 0) ?
            resolve(sequelize) :
            reject(`Error: '${failed.length}' tables have failed to seed.`);

    });
};

const associateModels = async (sequelize) => {
    // Object.values().filter() gives us only models with the function `associateWithOtherModels`
    // For each model async `associateWithOtherModels()`
    // .map() returns an array of promises for each `associateWithOtherModels` call
    // Promise.allSettled waits for all `associateWithOtherModels` to complete before returning a result array

    return new Promise(async function (resolve, reject) {
        const results = await Promise.allSettled(
            Object.values(sequelize.models)
                .filter(model => typeof model.__associate === "function")
                .map(async (model) => await model.__associate(sequelize.models))
        );
        
        const failed = Object.values(results).filter(result => result.status === 'rejected');

        return (failed.length <= 0) ?
            resolve(sequelize) :
            reject(`Error: '${failed.length}' tables have failed to associate.`);

    });
};

const dissociateModels = async (sequelize) => {
    return new Promise(async function (resolve, reject) {
        const results = await Promise.allSettled(
            Object.values(sequelize.models)
                .filter(model => typeof model.__disassociate === "function")
                .map(async (model) => await model.__disassociate(sequelize.models))
        );

        const failed = Object.values(results).filter(result => result.status === 'rejected');
        console.log(failed)

        return (failed.length <= 0) ?
            resolve(sequelize) :
            reject(`Error: '${failed.length}' tables have failed to disassociate.`);

    });
};


const controller = {};

controller.seedTables = seedTables;
controller.loadModels = loadModels;
controller.associateModels = associateModels;
controller.dissociateModels = dissociateModels;

module.exports = controller;