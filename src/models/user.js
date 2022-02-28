const { defineModel, DataTypes, COLUMN_JSON, COLUMN_FK } = require('../lib/model-helpers');
const { encryptPassword, doPasswordsMatch } = require('../lib/utils/passwordUtils');
const { ModelError } = require('../lib/errors');



const seedData = [
  {
    "id": 1,
    "researcherId": 1,
    "securityLevelId": 4,
    "email": "uvmcomputes@gmail.com",
    "emailVerified": "2021-03-07 05:52:50",
    "password": "buttons12345",
    "firstName": "UVMC",
    "lastName": "Admin",
    "displayName": "UVMC Admin",
    settings: { state: "Vermont" }
  },
  {
    "id": 2,
    "securityLevelId": 2,
    "email": "joe.researcher@uvmcomputes.org",
    "emailVerified": "2021-03-07 05:52:50",
    "password": "buttons12345",
    "firstName": "Joe",
    "lastName": "Researcher",
    "displayName": "Science Joe",
    settings: { state: "Maine" }
  }
];

const defaultScope = {
  attributes: ['id', 'researcherId', 'securityLevelId', 'lastLogin', 'email', 'emailVerified', 'firstName', 'lastName', 'displayName', 'settings'],
  where: {
    disabled: null
  }
};

const addAssociations = (User, models) => {
  const { Researcher, SecurityLevel } = models;

  if (!Researcher || !SecurityLevel) return reject(`Table failed to be associated.`);

  Researcher.hasOne(User);
  User.belongsTo(Researcher, {
    as: 'researcherProfile',
    foreignKey: 'researcherId',
    constraints: false
  });

  SecurityLevel.hasMany(User);
  User.belongsTo(SecurityLevel, {
    as: 'userAuthLevel',
    foreignKey: 'securityLevelId',
    constraints: false
  });
};

const actions = {};
actions.getUserAuthProfile = (models) => async (userId) => {
  try {
    /* const Researcher = dbApi.model('Researcher');
    const User = dbApi.model('User');
    const SecurityLevel = dbApi.model('SecurityLevel'); */

    const { User, Researcher, SecurityLevel } = models;

    const user = await User.findOne({
      attributes: ['id', 'lastLogin', 'email', 'emailVerified', 'firstName', 'lastName', 'displayName', 'settings'],
      where: { id: userId },
      include: [{
        as: 'userAuthLevel',
        model: SecurityLevel,
        attributes: ['value', 'constant', 'desc'],
      }, {
        as: 'researcherProfile',
        model: Researcher,
        attributes: ['id', 'urlSlug']
      }]
    });
    
    return user;
  } catch (error) {
    throw new ModelError('Could not select user.', error);
  }
};

actions.verifyLoginCredentials = (models) => async (email, password) => {
  try {
    const { User } = models;

    const account = await User.findOne({
      attributes: ['id', 'password'],
      where: { email: email }
    });

    return (account && doPasswordsMatch(password, account.password)) ? account : false;
  } catch (error) {
    throw new ModelError('Could verify login credentials.', error);
  }
};

const modelDefinition = defineModel('User', {
  disabled: {
    type: DataTypes.DATE,
    defaultValue: null
  },
  researcherId: { 
    ...COLUMN_FK,
    allowNull: true
  },
  securityLevelId: {
    ...COLUMN_FK,
    allowNull: true,
    defaultValue: null
  },
  lastLogin: {
    type: DataTypes.DATE
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    // validate: {
    //   isEmail: true
    // },
    // unique: {
    //   args: true,
    //   msg: 'Email address already in use!'
    // }
  },
  emailVerified: {
    type: DataTypes.DATE,
    defaultValue: null
  },
  password: {
    type: DataTypes.STRING(255),
    defaultValue: null,
    set(value, name) {
      const hash = (value) ? encryptPassword(value) : null;
      this.setDataValue(name, hash);
    }
  },
  firstName: {
    type: DataTypes.STRING(255)
  },
  lastName: {
    type: DataTypes.STRING(255)
  },
  displayName: {
    type: DataTypes.STRING(255)
  },
  settings: { ...COLUMN_JSON }
}, { seedData, defaultScope, addAssociations, actions });


module.exports = modelDefinition;
module.exports.researcherModelDef = modelDefinition;
module.exports.default = modelDefinition;