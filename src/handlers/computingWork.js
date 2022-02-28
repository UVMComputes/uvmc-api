const { ModelError } = require('../lib/errors')



const getWork = async (dbApi, req) => {
   try {
      const ProjectJob = dbApi.model('ProjectJob');
      
      const job = await ProjectJob.selectNextJob();
      return job;
   } catch (error) {
      throw new ModelError('Could not get computing work.', error);
   }
};


const saveWork = async (dbApi, req) => {
   return { path: req.path };
};

module.exports.saveWork = saveWork;
module.exports.getWork = getWork;