const fse = require('fs-extra');
const path = require('path');

const getAllExportsInDirectory = (dirname = __dirname, ignoreFile = __filename) => {
    const ignoreFileName = path.basename(ignoreFile);
    const utilities = {};
    
    // Get array of all files in this directory
    fse.readdirSync(dirname).forEach(fileName => {
        // Dont import this file into itself
        if (fileName !== ignoreFileName) {
            // Include the db model
            const filePath = `./${fileName}`;
            const name = path.basename(filePath, path.extname(filePath));
            utilities[name] = require(filePath);
        }
    });

    return utilities;
};

module.exports = getAllExportsInDirectory;
module.exports.getAllExportsInDirectory = getAllExportsInDirectory;
module.exports.default = getAllExportsInDirectory;