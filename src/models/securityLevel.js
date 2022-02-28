const _ = require( 'lodash' );
const { defineModel, DataTypes } = require('../lib/model-helpers');


const seedData = [
  {
    "id": 1,
    "value": 0,
    "constant": "LEVEL_unauthenticated",
    "desc": "This request is not logged in."
  },
  {
    "id": 2,
    "value": 1,
    "constant": "levelUser",
    "desc": "Authenticated user."
  },
  {
    "id": 3,
    "value": 2,
    "constant": "LEVEL RESEARCHER",
    "desc": "Account used for managing projects on the super computer."
  },
  {
    "id": 4,
    "value": 99,
    "constant": "LEVEL_ADMIN",
    "desc": "Administrative account for the website likely a developer."
  }
];

const defaultScope = {
  attributes: ['value', 'constant', 'desc'],
  order: [['value', 'DESC']]
};

const actions = {};
const selectLevel = async (models, constant = 'LEVEL_UNAUTHENTICATED') => {
  try {
    const { SecurityLevel } = models;

    const level = await SecurityLevel.findOne({
        attributes: ['id'],
        where: { constant }
    })
    return level;
  } catch (error) {
    throw new ModelError('Could not find security level.', error);
  }
};
actions.selectLevelUnauthenticated = selectLevel;
actions.selectLevelUser = (models) => () => selectLevel(models, 'LEVEL_USER');
actions.selectLevelResearcher = (models) => () => selectLevel(models, 'LEVEL_RESEARCHER');
actions.selectLevelAdmin = (models) => () => selectLevel(models, 'LEVEL_ADMIN');

module.exports = defineModel('SecurityLevel', {
  value: {
    type: DataTypes.INTEGER(11).UNSIGNED,
    allowNull: false,
    unique: true,
    validate: {
        isInt: {
            args: true,
            msg: 'Invalid security level value, must be a unique int.'
        }
    }
  },
  constant: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    set(value, name) {
        this.setDataValue(name, _.toUpper(_.snakeCase(value)));
    }
  },
  desc: {
    type: DataTypes.STRING(255)
  }
}, { seedData, defaultScope, actions });