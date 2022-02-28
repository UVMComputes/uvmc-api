const Sequelize = require('sequelize');

const isPromise = item =>
    !!item &&
    typeof item.then === 'function';

const isError = item => 
!!item &&
    typeof item.name === 'string' &&
    typeof item.message === 'string';

const isMethod = item => 
!!item &&
    typeof item === 'function';
     
const isDataModel = model => !!model
    && model.prototype
    && model.prototype instanceof Sequelize.Model;

const isEmpty = item => (
    (item === null) ||
    (Array.isArray(item) && item.length <= 0) ||
    (typeof item === 'string' && item === '') ||
    (typeof item === 'object' && JSON.stringify(item) === '{}')
);

const validationHelper = {
    isEmpty,
    isPromise,
    isError,
    isMethod,
    isDataModel,
};

module.exports = validationHelper;
module.exports.validationHelper = validationHelper;
module.exports.default = validationHelper;