const fse = require('fs-extra');
const path = require('path');


const thisFile = path.basename(__filename);
const utilities = {};

// Get array of all files in this directory
fse.readdirSync(__dirname).forEach(fileName => {
    // Dont import this file into itself
    if (fileName !== thisFile) {
        // Include the db model
        const utilPath = `./${fileName}`;//(path.join(__dirname, 'factories'));
        const utilName = path.basename(utilPath, path.extname(utilPath));
        utilities[utilName] = require('./' + fileName);
    }
});

module.exports = utilities;