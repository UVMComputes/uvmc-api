const parse = (string, failedVal = {}) => {
    try {
        if(string && typeof string === 'string') {
            const plain = JSON.parse(string);
            if(plain && typeof plain === 'object') return plain;
        }
        return failedVal;
    } catch (e) {
        return failedVal;
    }
};

const stringify = (obj, failedVal = '') => {
    try {
        if(obj && typeof obj === 'object') {
            const string = JSON.stringify(obj);
            if(string && typeof string === 'string') return string;
        }
        return failedVal;
    } catch (e) {
        return failedVal;
    }
};

const simplify = (obj, failedVal = {}) => {
    const string = stringify(obj, false);
    return parse(string, failedVal);
};

const isValidJson = string => (parse(string, false)) ? true : false;


const jsonUtils = {
    isValidJson,
    parse,
    stringify,
    simplify,
};

module.exports = jsonUtils;
module.exports.jsonUtils = jsonUtils;
module.exports.default = jsonUtils;