const { DataTypes } = require('sequelize');

const jsonUtils = require('../utils/jsonUtils');
const slugify = require('../utils/slugify');

const COLUMN_FK = {
    type: DataTypes.INTEGER(11).UNSIGNED,
    allowNull: false,
    validate: {
        isInt: {
            args: true,
            msg: 'Invalid id.'
        },
        min: {
            args: 1,
            msg: 'Invalid id.'
        },
    }
};

const COLUMN_PK = {
    ...COLUMN_FK,
    primaryKey: true,
    autoIncrement: true,
    autoIncrementIdentity: true
};

const COLUMN_JSON = {
    type: DataTypes.TEXT,
    defaultValue: null,
    set(value, name) {
        const string = (value && typeof value !== 'string') ? jsonUtils.stringify(value) : value;
        this.setDataValue(name, string);
    },
    get(name) {
        const value = this.getDataValue(name);
        return (value) ? jsonUtils.parse(value) : value;
    }
};

const COLUMN_SLUGIFY = {
    type: DataTypes.TEXT,
    defaultValue: null,
    set(value, name) {
        const slug = (value) ? slugify(value) : value;
        this.setDataValue(name, slug);
    }
};


const attributes = {};
attributes.COLUMN_PK = COLUMN_PK;
attributes.COLUMN_FK = COLUMN_FK;
attributes.COLUMN_JSON = COLUMN_JSON;
attributes.COLUMN_SLUGIFY = COLUMN_SLUGIFY;
attributes.DataTypes = DataTypes;

module.exports = attributes;
module.exports.attributes = attributes;
module.exports.default = attributes;