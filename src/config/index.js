const includeDotEnvFile = require('./includeDotEnvFile');
const AppConfig = require('./AppConfig');


const getAppConfig = (appRootDirectory, loadNodeEnv) => {
    if (loadNodeEnv) includeDotEnvFile(appRootDirectory, loadNodeEnv);

    return new AppConfig(appRootDirectory);
};


module.exports = getAppConfig;
module.exports.getAppConfig = getAppConfig;
module.exports.default = getAppConfig;