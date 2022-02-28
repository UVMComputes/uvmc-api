const { defineModel, DataTypes, COLUMN_FK, COLUMN_JSON } = require('../lib/model-helpers');



const seedData = [
  {
    id: 1,
    "projectJobId": 1,
    "projectId": 1,
    "didComplete": false,
    "didError": false,
    "status": "IDOL",
    "runTimeMS": 0,
    "payload": "No output yet.",
    "meta": { "lorem": "ipsum" }
  }
];

const defaultScope = {
  attributes: ['id', 'projectJobId', 'didComplete', 'didError', 'status', 'runTimeMS', 'payload', 'meta']
};

const addAssociations = (ProjectJobTask, models) => {
  const { ProjectJob } = models;

  if (!ProjectJobTask || !ProjectJob) return reject(`Table failed to be associated.`);

  ProjectJob.hasMany(ProjectJobTask);
  ProjectJobTask.belongsTo(ProjectJob, {
    as: 'projectJob',
    foreignKey: 'projectJobId',
    constraints: false
    /* foreignKey: {
        name: 'projectJobId',
        allowNull: false
    } */
  });
};

const actions = {};
actions.selectWaitingTask = (models = {}) => async () => {
  return new Promise((resolve, reject) => {
    const { ProjectJobTask, ProjectJob, Project } = models;

    ProjectJobTask.findOne({
      all: true,
      raw: true,
      nest: true,
      order: [
        ['createdAt', 'DESC']
      ],
      // include: [{
      //     as: 'projectJob',
      //     model: ProjectJob,
      // }]
    })
      .then(result => {

        resolve({
          task: result
        });
      })
      .catch(error => {
        console.error(error);
        resolve({
          task: 'No tasks found.'
        });
      });
  });
};

const modelDefinition = defineModel('ProjectJobTask', {
  projectJobId: { ...COLUMN_FK },
  didComplete: {
    field: 'did_complete',
    type: DataTypes.BOOLEAN,
    defaultValue: null
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
  runTimeMS: {
    field: 'run_time_ms',
    type: DataTypes.INTEGER(11).UNSIGNED,
    allowNull: true
  },
  payload: {
    field: 'payload',
    type: DataTypes.BLOB,
    allowNull: true
  },
  meta: { ...COLUMN_JSON }
}, { seedData, defaultScope, actions, addAssociations });



module.exports = modelDefinition;
module.exports.jobFileModelDef = modelDefinition;
module.exports.default = modelDefinition;