const { defineModel, DataTypes, COLUMN_FK, COLUMN_JSON } = require('../lib/model-helpers');
const { ModelError } = require('../lib/errors')



const seedData = [
  {
    "id": 1,
    "projectId": 1,
    "didComplete": false,
    "didError": false,
    "status": "SUCCESS",
    "name": "Hello World Seed Job",
    "options": { "lorem": "ipsum" }
  }
];

const defaultScope = {
  attributes: ['id', 'projectId', 'didComplete', 'didError', 'status', 'name', 'options', 'createdAt', 'updatedAt']
};

const addAssociations = (ProjectJob, models) => {
  try {
    const { Project } = models;
  
    if (!Project || !ProjectJob) return reject(`Table failed to be associated.`);
  
    Project.hasMany(ProjectJob);
    ProjectJob.belongsTo(Project, {
      as: 'project',
      foreignKey: 'projectId',
      constraints: false
    });
    
  } catch (error) {
    console.debug(error);
    return (error);
  }
};

const actions = {};

actions.selectNextJob = (models) => async () => {
  // SELECT * FROM `project_jobs` ORDER BY `updated_at`, `created_at`, `did_error`
  //  WHERE `did_complete` = 0

  try {
    const { ProjectJob, ProjectJobFile } = models;

    const job = await ProjectJob.findOne({
      attributes: ['id', 'projectId', 'didComplete', 'didError', 'status', 'name', 'options', 'createdAt', 'updatedAt'],
      order: [['createdAt', 'ASC'], ['updatedAt', 'ASC']]
    });

    const files = await ProjectJobFile.selectJobFiles(job.id);

    return { ...job.get({ plain: true }), payload: files };
  } catch (error) {
    throw new ModelError('Could not select researcher profile.', error);
  }
};


// Define the Project Job Model
const modelDefinition = defineModel('ProjectJob', {
  projectId: { ...COLUMN_FK },
  didComplete: {
    field: 'did_complete',
    type: DataTypes.BOOLEAN,
    defaultValue: 0
  },
  didError: {
    field: 'did_error',
    type: DataTypes.BOOLEAN,
    defaultValue: null
  },
  status: {
    field: 'status',
    type: DataTypes.STRING(255)
  },
  name: {
    field: 'name',
    type: DataTypes.STRING(255)
  },
  options: { ...COLUMN_JSON }
}, { seedData, addAssociations, actions });

module.exports = modelDefinition;