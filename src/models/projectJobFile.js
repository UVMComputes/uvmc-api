const moment = require('moment');
const { defineModel, DataTypes, COLUMN_FK, COLUMN_JSON } = require('../lib/model-helpers');



const now = moment();
const executable = `# This task was generated on the aws server.
# Loop count based on current time
# Current time: ${now.format('h:mm:ss a')}

print("This task was generated on the aws server.")

i = 1
while i < ${now.format('hmmss')}:
  print(i)
  i += 1

i`;

const seedData = [
  {
    id: 1,
    projectId: 1,
    projectJobId: 1,
    name: 'demo_code_server.py',
    type: 'py',
    executable: executable,
    "options": { "lorem": "ipsum" }
  }
];

const addAssociations = (ProjectJobFile, models) => {
  const { ProjectJob } = models;

  if (!ProjectJobFile || !ProjectJob) return reject(`Table failed to be associated.`);

  ProjectJob.hasMany(ProjectJobFile);
  ProjectJobFile.belongsTo(ProjectJob, {
    as: 'fileProjectJob',
    foreignKey: 'projectJobId',
    constraints: false
  });
};

const defaultScope = {
  attributes: ['id', 'projectJobId', 'name', 'type', 'executable', 'options']
};

const actions = {};

actions.selectJobFiles = (models) => async (projectJobId) => {
  try {
    const { ProjectJobFile } = models;

    const fileModels = await ProjectJobFile.findAll({
      attributes: ['id', 'name', 'type', 'executable', 'options'],
      where: { projectJobId: projectJobId }
    });
    const files = fileModels.map(file => file.get({ plain: true }));

    console.log(files);
    return files;
  } catch (error) {
    throw new ModelError('Could not select job files.', error);
  }
};


const modelDefinition = defineModel('ProjectJobFile', {
  projectJobId: { ...COLUMN_FK },
  name: {
    field: 'name',
    type: DataTypes.STRING(255),
    allowNull: false
  },
  type: {
    field: 'type',
    type: DataTypes.STRING(255)
  },
  executable: {
    field: 'executable',
    type: DataTypes.BLOB,
    allowNull: false
  },
  options: { ...COLUMN_JSON }
}, { seedData, addAssociations, actions });



module.exports = modelDefinition;
module.exports.jobFileModelDef = modelDefinition;
module.exports.default = modelDefinition;