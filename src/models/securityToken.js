const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const { defineModel, DataTypes, COLUMN_JSON, COLUMN_FK } = require('../lib/model-helpers');
const { ModelError } = require('../lib/errors');


const seedData = [
  {
    "userId": 1,
    "token": "sandbox",
    "event": "login",
    "expiresAt": new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
    options: { state: "Vermont" }
  },
];

const defaultScope = {
  attributes: ['userId', 'expiresAt', 'event', 'options'],
  order: [['expiresAt', 'DESC']]
};

const actions = {};
const destroyExpiredTokensWhere = async (models, where = {}) => {
  try {
    const { SecurityToken } = models;

    const result = await SecurityToken.destroy({
      where: {
        ...where,
        expiresAt: { [Op.lt]: new Date() }
      }
    });

    return result;
  } catch (error) {
    throw new ModelError('Could not clear expired tokens.', error);
  }
};

actions.deleteToken = (models) => async (token) => {
  try {
    const { SecurityToken } = models;

    const session = await SecurityToken.findOne({ where: { token } });

    if(!session || !session.userId) return false;

    const result = await SecurityToken.destroy({ where: { token } });
    const userExpiredSessions = await destroyExpiredTokensWhere(models, { userId: session.userId });

    return result;
  } catch (error) {
    throw new ModelError('Could not logout session.', error);
  }
};

actions.selectValidSession = (models) => async (token) => {
  try {
    const { SecurityToken } = models;

    const session = await SecurityToken.findOne({ where: { token } });

    if(!session || !session.userId) return false;

    const userExpiredSessions = await destroyExpiredTokensWhere(models, { userId: session.userId });

    return (session && new Date(session.expiresAt) >= new Date()) ? session : false;
  } catch (error) {
    throw new ModelError('Could not validate token.', error);
  }
};

actions.createToken = (models) => async (userId, email, event = 'login', extendDuration = false) => {
  try {
    const { SecurityToken } = models;

    // Time values are being set using https://github.com/vercel/ms
    const expiresIn = (extendDuration) ? '3 days' : '1 days';
    const expiresAt = (extendDuration) ? new Date().setDate(new Date().getDate() + 3) : new Date().setDate(new Date().getDate() + 1);

    const token = jwt.sign({ userId, email }, 'JWT_SECRET_KEY', { expiresIn: expiresIn });

    const saved = await SecurityToken.create({ token, userId, event, expiresAt });

    return saved;
  } catch (error) {
    throw new ModelError('Could not create token.', error);
  }
};

module.exports = defineModel('SecurityToken', {
  userId: { ...COLUMN_FK },
  token: {
    type: DataTypes.STRING(255)
  },
  event: {
    type: DataTypes.STRING(255)
  },
  options: { ...COLUMN_JSON },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, { defaultScope, seedData, actions });