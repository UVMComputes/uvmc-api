const { ModelError } = require('../lib/errors');


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

const init = (sequelize) => {
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


module.exports = init;
module.exports.init = init;
module.exports.default = init;