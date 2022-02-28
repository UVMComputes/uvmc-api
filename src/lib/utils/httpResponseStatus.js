const http = require('http');


const HTTP_SUCCESS = 200;
const HTTP_ERROR = 500;

const isInformational = (code) => (100 <= code && code <= 199);
const isSuccess = (code) => (200 <= code && code <= 299);
const isRedirect = (code) => (300 <= code && code <= 399);
const isClientError = (code) => (400 <= code && code <= 499);
const isServerError = (code) => (500 <= code && code <= 599);
const isError = (code) => (400 <= code && code <= 599);

const statuses = {};
Object.entries(http.STATUS_CODES).forEach(([key, status]) => {
    const code = parseInt(key);
    let type = 'Error';
    switch (true) {
        case isInformational(code):
            type = 'Informational';
            break;
        case isSuccess(code):
            type = 'Success';
            break;
        case isRedirect(code):
            type = 'Redirect';
            break;
        case isClientError(code):
            type = 'Client Error';
            break;
        case isServerError(code):
            type = 'Server Error';
            break;
    }
    statuses[code] = { code, type, status };
});
const validCodes = Object.keys(statuses);



// Returns a valid code or false
const _parseHttpCode = (code = 0) => {
    const parsed = parseInt(code);

    // If parsing fails or the number is out of range
    if (!isNaN(parsed) && validCodes.indexOf(parsed)) { return parsed; }

    // If its in range but not defined, round down to the nearest 100th
    const roundDown = Math.round(parsed / 100) * 100;
    return (validCodes.indexOf(roundDown)) ? roundDown : false;
};

const getStatus = (code) => {
    const httpCode = _parseHttpCode(code);    
    return (httpCode) ? statuses[httpCode] : false;
};

const getSuccess = (code = HTTP_SUCCESS) => {
    const status = getStatus(code);
    return (status && isSuccess(status.code)) ? status : getStatus(HTTP_SUCCESS);
};

const getError = (code = HTTP_ERROR) => {
    const status = getStatus(code);
    return (status && isError(status.code)) ? status : getStatus(HTTP_ERROR);
};



const utilities = {};
utilities.statuses = { ...statuses };
utilities.defaultError = getError();
utilities.defaultSuccess = getSuccess();
utilities.getStatus = getStatus;
utilities.getSuccess = getSuccess;
utilities.getError = getError;

module.exports = utilities;
module.exports.httpResponseStatuses = utilities;
module.exports.default = utilities;