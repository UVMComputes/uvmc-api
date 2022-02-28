<ref *1> BelongsTo {
  source: [class Project extends Model] {
    sequelize: Sequelize {
      options: [Object],
      config: [Object],
      dialect: [MysqlDialect],
      queryInterface: [MySQLQueryInterface],
      models: [Object],
      modelManager: [ModelManager],
      connectionManager: [ConnectionManager]
    },
    options: {
      timestamps: true,
      validate: {},
      freezeTableName: false,
      underscored: true,
      paranoid: false,
      rejectOnEmpty: false,
      whereCollection: null,
      schema: null,
      schemaDelimiter: '',
      defaultScope: [Object],
      scopes: {},
      indexes: [],
      name: [Object],
      omitNull: false,
      sequelize: [Sequelize],
      hooks: {}
    },
    associations: { projectResearcher: [Circular *1], ProjectJobs: [HasMany] },
    underscored: true,
    tableName: 'projects',
    _schema: null,
    _schemaDelimiter: '',
    rawAttributes: {
      id: [Object],
      researcherId: [Object],
      name: [Object],
      urlSlug: [Object],
      logo: [Object],
      about: [Object],
      readme: [Object],
      options: [Object],
      createdAt: [Object],
      updatedAt: [Object],
      ResearcherId: [Object]
    },
    _indexes: [],
    primaryKeys: { id: [Object] },
    _readOnlyAttributes: Set(2) { 'createdAt', 'updatedAt' },
    _timestampAttributes: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    _hasReadOnlyAttributes: true,
    _dataTypeChanges: {
      createdAt: [Function: _isChanged],
      updatedAt: [Function: _isChanged]
    },
    _dataTypeSanitizers: {
      createdAt: [Function: _sanitize],
      updatedAt: [Function: _sanitize]
    },
    _hasBooleanAttributes: false,
    _hasDateAttributes: true,
    _jsonAttributes: Set(0) {},
    _virtualAttributes: Set(0) {},
    _defaultValues: {
      urlSlug: [Function (anonymous)],
      options: [Function (anonymous)]
    },
    fieldRawAttributesMap: {
      id: [Object],
      researcher_id: [Object],
      name: [Object],
      url_slug: [Object],
      logo: [Object],
      about: [Object],
      readme: [Object],
      options: [Object],
      created_at: [Object],
      updated_at: [Object]
    },
    uniqueKeys: {},
    fieldAttributeMap: {
      researcher_id: 'ResearcherId',
      url_slug: 'urlSlug',
      created_at: 'createdAt',
      updated_at: 'updatedAt'
    },
    _hasJsonAttributes: false,
    _hasVirtualAttributes: false,
    _hasDefaultValues: true,
    tableAttributes: {
      id: [Object],
      researcherId: [Object],
      name: [Object],
      urlSlug: [Object],
      logo: [Object],
      about: [Object],
      readme: [Object],
      options: [Object],
      createdAt: [Object],
      updatedAt: [Object],
      ResearcherId: [Object]
    },
    primaryKeyAttributes: [ 'id' ],
    primaryKeyAttribute: 'id',
    primaryKeyField: 'id',
    _hasPrimaryKeys: true,
    _isPrimaryKey: [Function (anonymous)],
    autoIncrementAttribute: 'id',
    _scope: { attributes: [Array], include: [Array] },
    _scopeNames: [ 'defaultScope' ],
    __consoleLog: [Function (anonymous)],
    actions: {
      create: [Function: create],
      update: [Function: update],
      delete: [Function: destroy],
      getById: [Function: getById],
      getWhere: [Function: getWhere],
      createProject: [Function: create],
      updateProject: [Function: update],
      deleteProject: [Function: destroy],
      getProjectById: [Function: getById],
      getProjectWhere: [Function: getWhere]
    },
    __seed: [Function (anonymous)],
    __associate: [AsyncFunction (anonymous)],
    __disassociate: [AsyncFunction (anonymous)]
  },
  target: [class Researcher extends Model] {
    sequelize: Sequelize {
      options: [Object],
      config: [Object],
      dialect: [MysqlDialect],
      queryInterface: [MySQLQueryInterface],
      models: [Object],
      modelManager: [ModelManager],
      connectionManager: [ConnectionManager]
    },
    options: {
      timestamps: true,
      validate: {},
      freezeTableName: false,
      underscored: true,
      paranoid: false,
      rejectOnEmpty: false,
      whereCollection: null,
      schema: null,
      schemaDelimiter: '',
      defaultScope: [Object],
      scopes: {},
      indexes: [],
      name: [Object],
      omitNull: false,
      sequelize: [Sequelize],
      hooks: {}
    },
    associations: { Projects: [HasMany], User: [HasOne] },
    underscored: true,
    tableName: 'researchers',
    _schema: null,
    _schemaDelimiter: '',
    rawAttributes: {
      id: [Object],
      accountApproved: [Object],
      accountDisabled: [Object],
      urlSlug: [Object],
      bio: [Object],
      createdAt: [Object],
      updatedAt: [Object]
    },
    _indexes: [],
    primaryKeys: { id: [Object] },
    _readOnlyAttributes: Set(2) { 'createdAt', 'updatedAt' },
    _timestampAttributes: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    _hasReadOnlyAttributes: true,
    _dataTypeChanges: {
      accountApproved: [Function: _isChanged],
      accountDisabled: [Function: _isChanged],
      createdAt: [Function: _isChanged],
      updatedAt: [Function: _isChanged]
    },
    _dataTypeSanitizers: {
      accountApproved: [Function: _sanitize],
      accountDisabled: [Function: _sanitize],
      createdAt: [Function: _sanitize],
      updatedAt: [Function: _sanitize]
    },
    _hasBooleanAttributes: false,
    _hasDateAttributes: true,
    _jsonAttributes: Set(0) {},
    _virtualAttributes: Set(0) {},
    _defaultValues: {
      accountApproved: [Function (anonymous)],
      accountDisabled: [Function (anonymous)],
      urlSlug: [Function (anonymous)]
    },
    fieldRawAttributesMap: {
      id: [Object],
      account_approved: [Object],
      account_disabled: [Object],
      url_slug: [Object],
      bio: [Object],
      created_at: [Object],
      updated_at: [Object]
    },
    uniqueKeys: {},
    fieldAttributeMap: {
      account_approved: 'accountApproved',
      account_disabled: 'accountDisabled',
      url_slug: 'urlSlug',
      created_at: 'createdAt',
      updated_at: 'updatedAt'
    },
    _hasJsonAttributes: false,
    _hasVirtualAttributes: false,
    _hasDefaultValues: true,
    tableAttributes: {
      id: [Object],
      accountApproved: [Object],
      accountDisabled: [Object],
      urlSlug: [Object],
      bio: [Object],
      createdAt: [Object],
      updatedAt: [Object]
    },
    primaryKeyAttributes: [ 'id' ],
    primaryKeyAttribute: 'id',
    primaryKeyField: 'id',
    _hasPrimaryKeys: true,
    _isPrimaryKey: [Function (anonymous)],
    autoIncrementAttribute: 'id',
    _scope: { attributes: [Array] },
    _scopeNames: [ 'defaultScope' ],
    __consoleLog: [Function (anonymous)],
    actions: {
      create: [Function: create],
      update: [Function: update],
      delete: [Function: destroy],
      getById: [Function: getById],
      getWhere: [Function: getWhere],
      createResearcher: [Function: create],
      updateResearcher: [Function: update],
      deleteResearcher: [Function: destroy],
      getResearcherById: [Function: getById],
      getResearcherWhere: [Function: getWhere]
    },
    __seed: [Function (anonymous)],
    __associate: [AsyncFunction (anonymous)],
    __disassociate: [AsyncFunction (anonymous)]
  },
  options: {
    as: 'projectResearcher',
    foreignKey: 'researcherId',
    constraints: false,
    hooks: {},
    useHooks: false,
    timestamps: true,
    validate: {},
    freezeTableName: false,
    underscored: true,
    paranoid: false,
    rejectOnEmpty: false,
    whereCollection: null,
    schema: null,
    schemaDelimiter: '',
    defaultScope: { attributes: [Array] },
    scopes: {},
    indexes: [],
    name: { singular: 'projectResearcher' },
    omitNull: false,
    sequelize: Sequelize {
      options: [Object],
      config: [Object],
      dialect: [MysqlDialect],
      queryInterface: [MySQLQueryInterface],
      models: [Object],
      modelManager: [ModelManager],
      connectionManager: [ConnectionManager]
    }
  },
  scope: undefined,
  isSelfAssociation: false,
  as: 'projectResearcher',
  associationType: 'BelongsTo',
  isSingleAssociation: true,
  foreignKeyAttribute: {},
  isAliased: true,
  foreignKey: 'researcherId',
  identifier: 'researcherId',
  identifierField: 'researcher_id',
  targetKey: 'id',
  targetKeyField: 'id',
  targetKeyIsPrimary: true,
  targetIdentifier: 'id',
  associationAccessor: 'projectResearcher',
  accessors: {
    get: 'getProjectResearcher',
    set: 'setProjectResearcher',
    create: 'createProjectResearcher'
  }
}
<ref *1> HasMany {
  source: [class Project extends Model] {
    sequelize: Sequelize {
      options: [Object],
      config: [Object],
      dialect: [MysqlDialect],
      queryInterface: [MySQLQueryInterface],
      models: [Object],
      modelManager: [ModelManager],
      connectionManager: [ConnectionManager]
    },
    options: {
      timestamps: true,
      validate: {},
      freezeTableName: false,
      underscored: true,
      paranoid: false,
      rejectOnEmpty: false,
      whereCollection: null,
      schema: null,
      schemaDelimiter: '',
      defaultScope: [Object],
      scopes: {},
      indexes: [],
      name: [Object],
      omitNull: false,
      sequelize: [Sequelize],
      hooks: {}
    },
    associations: { projectResearcher: [BelongsTo], ProjectJobs: [Circular *1] },
    underscored: true,
    tableName: 'projects',
    _schema: null,
    _schemaDelimiter: '',
    rawAttributes: {
      id: [Object],
      researcherId: [Object],
      name: [Object],
      urlSlug: [Object],
      logo: [Object],
      about: [Object],
      readme: [Object],
      options: [Object],
      createdAt: [Object],
      updatedAt: [Object],
      ResearcherId: [Object]
    },
    _indexes: [],
    primaryKeys: { id: [Object] },
    _readOnlyAttributes: Set(2) { 'createdAt', 'updatedAt' },
    _timestampAttributes: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    _hasReadOnlyAttributes: true,
    _dataTypeChanges: {
      createdAt: [Function: _isChanged],
      updatedAt: [Function: _isChanged]
    },
    _dataTypeSanitizers: {
      createdAt: [Function: _sanitize],
      updatedAt: [Function: _sanitize]
    },
    _hasBooleanAttributes: false,
    _hasDateAttributes: true,
    _jsonAttributes: Set(0) {},
    _virtualAttributes: Set(0) {},
    _defaultValues: {
      urlSlug: [Function (anonymous)],
      options: [Function (anonymous)]
    },
    fieldRawAttributesMap: {
      id: [Object],
      researcher_id: [Object],
      name: [Object],
      url_slug: [Object],
      logo: [Object],
      about: [Object],
      readme: [Object],
      options: [Object],
      created_at: [Object],
      updated_at: [Object]
    },
    uniqueKeys: {},
    fieldAttributeMap: {
      researcher_id: 'ResearcherId',
      url_slug: 'urlSlug',
      created_at: 'createdAt',
      updated_at: 'updatedAt'
    },
    _hasJsonAttributes: false,
    _hasVirtualAttributes: false,
    _hasDefaultValues: true,
    tableAttributes: {
      id: [Object],
      researcherId: [Object],
      name: [Object],
      urlSlug: [Object],
      logo: [Object],
      about: [Object],
      readme: [Object],
      options: [Object],
      createdAt: [Object],
      updatedAt: [Object],
      ResearcherId: [Object]
    },
    primaryKeyAttributes: [ 'id' ],
    primaryKeyAttribute: 'id',
    primaryKeyField: 'id',
    _hasPrimaryKeys: true,
    _isPrimaryKey: [Function (anonymous)],
    autoIncrementAttribute: 'id',
    _scope: { attributes: [Array], include: [Array] },
    _scopeNames: [ 'defaultScope' ],
    __consoleLog: [Function (anonymous)],
    actions: {
      create: [Function: create],
      update: [Function: update],
      delete: [Function: destroy],
      getById: [Function: getById],
      getWhere: [Function: getWhere],
      createProject: [Function: create],
      updateProject: [Function: update],
      deleteProject: [Function: destroy],
      getProjectById: [Function: getById],
      getProjectWhere: [Function: getWhere]
    },
    __seed: [Function (anonymous)],
    __associate: [AsyncFunction (anonymous)],
    __disassociate: [AsyncFunction (anonymous)]
  },
  target: [class ProjectJob extends Model] {
    sequelize: Sequelize {
      options: [Object],
      config: [Object],
      dialect: [MysqlDialect],
      queryInterface: [MySQLQueryInterface],
      models: [Object],
      modelManager: [ModelManager],
      connectionManager: [ConnectionManager]
    },
    options: {
      timestamps: true,
      validate: {},
      freezeTableName: false,
      underscored: true,
      paranoid: false,
      rejectOnEmpty: false,
      whereCollection: null,
      schema: null,
      schemaDelimiter: '',
      defaultScope: [Object],
      scopes: {},
      indexes: [],
      name: [Object],
      omitNull: false,
      sequelize: [Sequelize],
      hooks: {}
    },
    associations: {
      jobProject: [BelongsTo],
      ProjectJobFiles: [HasMany],
      ProjectJobTasks: [HasMany]
    },
    underscored: true,
    tableName: 'project_jobs',
    _schema: null,
    _schemaDelimiter: '',
    rawAttributes: {
      id: [Object],
      projectId: [Object],
      didComplete: [Object],
      didError: [Object],
      status: [Object],
      name: [Object],
      options: [Object],
      createdAt: [Object],
      updatedAt: [Object],
      ProjectId: [Object]
    },
    _indexes: [],
    primaryKeys: { id: [Object] },
    _readOnlyAttributes: Set(2) { 'createdAt', 'updatedAt' },
    _timestampAttributes: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    _hasReadOnlyAttributes: true,
    _dataTypeChanges: {
      createdAt: [Function: _isChanged],
      updatedAt: [Function: _isChanged]
    },
    _dataTypeSanitizers: {
      didComplete: [Function: _sanitize],
      didError: [Function: _sanitize],
      createdAt: [Function: _sanitize],
      updatedAt: [Function: _sanitize]
    },
    _hasBooleanAttributes: true,
    _hasDateAttributes: true,
    _jsonAttributes: Set(0) {},
    _virtualAttributes: Set(0) {},
    _defaultValues: {
      didComplete: [Function (anonymous)],
      didError: [Function (anonymous)],
      options: [Function (anonymous)]
    },
    fieldRawAttributesMap: {
      id: [Object],
      project_id: [Object],
      did_complete: [Object],
      did_error: [Object],
      status: [Object],
      name: [Object],
      options: [Object],
      created_at: [Object],
      updated_at: [Object]
    },
    uniqueKeys: {},
    fieldAttributeMap: {
      project_id: 'ProjectId',
      did_complete: 'didComplete',
      did_error: 'didError',
      created_at: 'createdAt',
      updated_at: 'updatedAt'
    },
    _hasJsonAttributes: false,
    _hasVirtualAttributes: false,
    _hasDefaultValues: true,
    tableAttributes: {
      id: [Object],
      projectId: [Object],
      didComplete: [Object],
      didError: [Object],
      status: [Object],
      name: [Object],
      options: [Object],
      createdAt: [Object],
      updatedAt: [Object],
      ProjectId: [Object]
    },
    primaryKeyAttributes: [ 'id' ],
    primaryKeyAttribute: 'id',
    primaryKeyField: 'id',
    _hasPrimaryKeys: true,
    _isPrimaryKey: [Function (anonymous)],
    autoIncrementAttribute: 'id',
    _scope: { attributes: [Array] },
    _scopeNames: [ 'defaultScope' ],
    __consoleLog: [Function (anonymous)],
    actions: {
      create: [Function: create],
      update: [Function: update],
      delete: [Function: destroy],
      getById: [Function: getById],
      getWhere: [Function: getWhere],
      createProjectJob: [Function: create],
      updateProjectJob: [Function: update],
      deleteProjectJob: [Function: destroy],
      getProjectJobById: [Function: getById],
      getProjectJobWhere: [Function: getWhere]
    },
    __seed: [Function (anonymous)],
    __associate: [AsyncFunction (anonymous)],
    __disassociate: [AsyncFunction (anonymous)]
  },
  options: {
    hooks: false,
    useHooks: false,
    timestamps: true,
    validate: {},
    freezeTableName: false,
    underscored: true,
    paranoid: false,
    rejectOnEmpty: false,
    whereCollection: null,
    schema: null,
    schemaDelimiter: '',
    defaultScope: { attributes: [Array], include: [Array] },
    scopes: {},
    indexes: [],
    name: { plural: 'ProjectJobs', singular: 'ProjectJob' },
    omitNull: false,
    sequelize: Sequelize {
      options: [Object],
      config: [Object],
      dialect: [MysqlDialect],
      queryInterface: [MySQLQueryInterface],
      models: [Object],
      modelManager: [ModelManager],
      connectionManager: [ConnectionManager]
    }
  },
  scope: undefined,
  isSelfAssociation: false,
  as: 'ProjectJobs',
  associationType: 'HasMany',
  targetAssociation: null,


  sequelize: <ref *2> Sequelize {
    options: {
      dialect: 'mysql',
      dialectModule: null,
      dialectModulePath: null,
      host: '127.0.0.1',
      protocol: 'tcp',
      define: [Object],
      query: {},
      sync: {},
      timezone: '+00:00',
      clientMinMessages: 'warning',
      standardConformingStrings: true,
      logging: undefined,
      omitNull: false,
      native: false,
      replication: false,
      ssl: undefined,
      pool: {},
      quoteIdentifiers: true,
      hooks: {},
      retry: [Object],
      transactionType: 'DEFERRED',
      isolationLevel: null,
      databaseVersion: '10.4.13',
      typeValidation: false,
      benchmark: false,
      minifyAliases: false,
      logQueryParameters: false,
      username: 'rdotey',
      password: 'rachellynndotey',
      database: 'uvmcomputes_dev',
      port: 3306
    },
    config: {
      database: 'uvmcomputes_dev',
      username: 'rdotey',
      password: 'rachellynndotey',
      host: '127.0.0.1',
      port: 3306,
      pool: {},
      protocol: 'tcp',
      native: false,
      ssl: undefined,
      replication: false,
      dialectModule: null,
      dialectModulePath: null,
      keepDefaultTimezone: undefined,
      dialectOptions: undefined
    },
    dialect: MysqlDialect {
      sequelize: [Circular *2],
      connectionManager: [ConnectionManager],
      queryGenerator: [MySQLQueryGenerator],
      queryInterface: [MySQLQueryInterface]
    },
    queryInterface: MySQLQueryInterface {
      sequelize: [Circular *2],
      queryGenerator: [MySQLQueryGenerator]
    },
    models: {
      Project: [Function],
      ProjectJob: [Function],
      ProjectJobFile: [Function],
      ProjectJobTask: [Function],
      Researcher: [Function],
      SecurityLevel: [Function],
      User: [Function]
    },
    modelManager: ModelManager { models: [Array], sequelize: [Circular *2] },
    connectionManager: ConnectionManager {
      sequelize: [Circular *2],
      config: [Object],
      dialect: [MysqlDialect],
      versionPromise: null,
      dialectName: 'mysql',
      pool: [Pool],
      lib: [Object]
    }
  },





  
  isMultiAssociation: true,
  foreignKeyAttribute: {},
  foreignKey: 'ProjectId',
  sourceKey: 'id',
  sourceKeyAttribute: 'id',
  sourceKeyField: 'id',
  associationAccessor: 'ProjectJobs',
  accessors: {
    get: 'getProjectJobs',
    set: 'setProjectJobs',
    addMultiple: 'addProjectJobs',
    add: 'addProjectJob',
    create: 'createProjectJob',
    remove: 'removeProjectJob',
    removeMultiple: 'removeProjectJobs',
    hasSingle: 'hasProjectJob',
    hasAll: 'hasProjectJobs',
    count: 'countProjectJobs'
  },
  identifierField: 'project_id',
  foreignKeyField: 'project_id'
} 






















Associations
{ projectResearcher: projectResearcher, ProjectJobs: ProjectJobs }
{
  jobProject: jobProject,
  ProjectJobFiles: ProjectJobFiles,
  ProjectJobTasks: ProjectJobTasks
}
{ fileProjectJob: fileProjectJob }
{ projectJob: projectJob }
{ Projects: Projects, User: User }
{ Users: Users }
{ researcherProfile: researcherProfile, userAuthLevel: userAuthLevel }

*/}
