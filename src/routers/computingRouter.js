const { ModelError } = require('../lib/errors')
const { getWork, saveWork } = require('../handlers/computingWork')

const router = require('express').Router();


const getComputeWork = async (req, res, next, saved = {}) => {
   const { dbApi, body, params, query } = req;
   await getWork(dbApi, req)
      .then(payload => {
         res.status(200).json({ ...saved, computingTask: payload });
      }).catch(next);
};

const saveComputeWork = async (req, res, next) => {
   const { dbApi, body, params, query } = req;
   const saved = await saveWork(dbApi, req);
   return getComputeWork(req, res, next, saved);
};

router.route('/').put(saveComputeWork).post(saveComputeWork);

router.get('/', getComputeWork);

module.exports = router;