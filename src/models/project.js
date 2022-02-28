const { DbModelNotDefinedError } = require('../lib/errors');
const { defineModel, DataTypes, COLUMN_FK, COLUMN_JSON, COLUMN_SLUGIFY } = require('../lib/model-helpers');



const seedData = [
  {
    "id": 1,
    "researcherId": 1,
    "name": "Hello World Seed Project",
    "urlSlug": "hello-seedy-world",
    "about": "Proin gravida est turpis, in gravida lacus efficitur feugiat. Donec ac vehicula tellus, sit amet tempor sem.",
    "readme": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec lorem quis libero ullamcorper vehicula eu sed velit. Maecenas viverra, massa vitae vulputate vestibulum, arcu odio cursus quam, a sollicitudin enim arcu eu nibh. Nunc in magna sagittis, ultrices lacus ut, egestas odio. Vivamus ullamcorper tortor vitae metus placerat ullamcorper. Feugiat leo id enim convallis imperdiet. Proin gravida est turpis, in gravida lacus efficitur feugiat. Donec ac vehicula tellus, sit amet tempor sem.",
    "options": { "lorem": "ipsum" }
  }
];

const defaultScope = {
  attributes: ['id', 'researcherId', 'name', 'urlSlug', 'logo', 'about']//, 'readme', 'options']
};

const addAssociations = (Project, models) => {
  try {
    const { User, Researcher } = models;

    if (!User || !Project || !Researcher) throw new DbModelNotDefinedError(`Table failed to be associated.`);

    User.hasMany(Project);
    Project.belongsTo(User, {
      as: 'researcher',
      foreignKey: 'researcherId',
      targetKey: 'researcherId',
      constraints: false
    });

    Project.addScope('defaultScope', {
      ...defaultScope,
      include: [{
        attributes: ['researcherId', 'displayName'],
        model: User,
        as: 'researcher',
        include: [{
          attributes: ['urlSlug'],
          model: Researcher,
          as: 'researcherProfile'
        }]
      }]
    }, { override: true });
    
  } catch (error) {
    console.debug(error);
    return (error);
  }
};

const actions = {};
actions.getResearcherProjects = (models) => async (researcherId) => {
  try {
    /* const Researcher = dbApi.model('Researcher');
    const User = dbApi.model('User');
    const SecurityLevel = dbApi.model('SecurityLevel'); */

    const { Project } = models;

    const researcher = await Researcher.findOne({
      attributes: ['id', 'urlSlug', 'bio'],
      where: { 
        [Op.or]: [{ id: researcherId }, { urlSlug: researcherId }]
       }
    });
    const user = await User.findOne({
      attributes: ['id', 'lastLogin', 'email', 'firstName', 'lastName', 'displayName'],
      where: { researcherId: researcher.id }
    });
    const projectModels = await Project.findAll({
       attributes: ['id', 'name', 'urlSlug', 'logo', 'about'],
       where: { researcherId: researcherId }
    });
    const projects = projectModels.map(project => {
      const data = project.get({ plain: true });
      data.url = `/${researcher.urlSlug/project.urlSlug}/`;
      return data;
    });
    
    let profile = user.get({ plain: true });
    profile.userId = user.id;
    profile = {
      ...profile,
      ...researcher.get({ plain: true }),
      projects: projects
    };

    return { profile: profile }
  } catch (error) {
    throw new ModelError('Could not select researcher project.', error);
  }
};

const modelDefinition = defineModel('Project', {
  researcherId: { ...COLUMN_FK },
  name: {
    type: DataTypes.STRING(255)
  },
  urlSlug: { ...COLUMN_SLUGIFY },
  logo: {
    type: DataTypes.BLOB
  },
  about: {
    type: DataTypes.TEXT
  },
  readme: {
    type: DataTypes.BLOB
  },
  options: { ...COLUMN_JSON }
}, { seedData, defaultScope, addAssociations, actions });


module.exports = modelDefinition;