const util = require('util')


const consoleDebugVerbose = (value) =>
    console.log(util.inspect(value, { showHidden: false, depth: null, colors: true }));


module.exports = consoleDebugVerbose;
module.exports.consoleDebugVerbose = consoleDebugVerbose;
module.exports.default = consoleDebugVerbose;