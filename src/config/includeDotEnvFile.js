const path = require('path');
const dotenv = require('dotenv');


const includeDotEnvFile = (rootDir, environment) => {
    if (!environment) return;

    // SECTION:     IMPORTANT CONFIGURATION INFORMATION
    // TODO:        Configure node Environment Variables for your
    // REVIEW:      See the config file for a list of use variables.
    const envConfigPath = path.join(rootDir, '/config', `/.env.${environment}`);
    const loaded = dotenv.config({ path: envConfigPath });
    return loaded;
};


module.exports = includeDotEnvFile;
module.exports.includeDotEnvFile = includeDotEnvFile;
module.exports.default = includeDotEnvFile;