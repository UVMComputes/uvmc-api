const Sequelize = require('sequelize');
const { defineModel, DataTypes, COLUMN_SLUGIFY } = require('../lib/model-helpers');
const { ModelError } = require('../lib/errors');

const Op = Sequelize.Op;

const seedData = [
  {
    "id": 1,
    "accountApproved": "2021-03-07 05:52:50",
    "urlSlug": "fancy-researcher-name",
    "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec lorem quis libero ullamcorper vehicula eu sed velit. Maecenas viverra, massa vitae vulputate vestibulum, arcu odio cursus quam, a sollicitudin enim arcu eu nibh. Nunc in magna sagittis, ultrices lacus ut, egestas odio. Vivamus ullamcorper tortor vitae metus placerat ullamcorper. Pellentesque feugiat leo id enim convallis imperdiet. Proin gravida est turpis, in gravida lacus efficitur feugiat. Donec ac vehicula tellus, sit amet tempor sem."
  }
];

const defaultScope = {
  attributes: ['id', 'urlSlug', 'bio']
};

const actions = {};
const selectBasicProfile = async (models, queryOptions) => {
  try {
    const { User } = models;

    const userModel = await User.findOne({
      attributes: ['id', 'lastLogin', 'displayName'],
      raw: true,
      ...queryOptions 
    });

    const profile = {
      userId: userModel.id,
      researcherId: userModel.researcherId,
      urlSlug: userModel.researcherProfile.urlSlug,
      displayName: userModel.displayName,
      lastLogin: userModel.lastLogin,
    };

    return profile;
  } catch (error) {
    throw new ModelError('Could not select researcher profile.', error);
  }
};

actions.getBasicProfileById = (models) => async (researcherId) => {
  const { Researcher } = models;
  return selectBasicProfile(models, {
    where: { researcherId: researcherId },
    include: [{
      as: 'researcherProfile',
      model: Researcher,
      attributes: ['id', 'urlSlug']
    }]
  });
};

actions.getBasicProfileByUrlSlug = (models) => async (urlSlug) => {
  const { Researcher } = models;
  return selectBasicProfile(models, {
    include: [{
      as: 'researcherProfile',
      model: Researcher,
      where: { urlSlug: urlSlug },
      attributes: ['id', 'urlSlug']
    }]
  });
};

const getProfile = async (models, queryOptions) => {
  try {
    const { Project } = models;

    const { profile } = await selectBasicProfile(models, queryOptions);

    const projectModels = await Project.findAll({
      attributes: ['id', 'name', 'urlSlug', 'logo', 'about'],
      where: { researcherId: profile.researcherId }
    });
    const projects = projectModels.map(project => {
      const data = project.get({ plain: true });
      data.url = `/${profile.urlSlug / project.urlSlug}/`;
      return data;
    });

    profile.projects = projects;

    return { profile: profile }
  } catch (error) {
    throw new ModelError('Could not select researcher.', error);
  }
};

actions.getProfileByResearcherId = (models) => async (researcherId) => {
  const { Researcher } = models;
  return getProfile(models, {
    attributes: ['id', 'lastLogin', 'displayName'],
    where: { researcherId: researcherId },
    include: [{
      as: 'researcherProfile',
      model: Researcher,
      attributes: ['id', 'urlSlug']
    }]
  });
};

actions.getProfileByResearcherUrlSlug = (models) => async (urlSlug) => {
  const { Researcher } = models;
  return getProfile(models, {
    attributes: ['id', 'lastLogin', 'displayName'],
    include: [{
      as: 'researcherProfile',
      model: Researcher,
      where: { urlSlug: urlSlug },
      attributes: ['id', 'urlSlug']
    }]
  });
};

const modelDefinition = defineModel('Researcher', {
  accountApproved: {
    field: 'account_approved',
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  },
  accountDisabled: {
    field: 'account_disabled',
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  },
  urlSlug: { ...COLUMN_SLUGIFY },
  bio: {
    field: 'bio',
    type: DataTypes.TEXT
  }
}, { seedData, defaultScope, actions });



module.exports = modelDefinition;
module.exports.researcherModelDef = modelDefinition;
module.exports.default = modelDefinition;