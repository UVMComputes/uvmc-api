const filterRequestPaging = require('../middleware/filterRequestPaging');
const { forceDatabaseReset, databaseHealthCheck, listModelActions } = require('../db/dbAdministrative');

const router = require('express').Router();

router.all('/database/reset', (req, res, next) => {
   forceDatabaseReset(req.dbApi.sequelize)
      .then(result => {
         res.status(200).json({
            'status': 'success',
            'message': 'Database successfully reset.'
         });
      }).catch(next);
});

router.all('/database/status', (req, res, next) => {
   databaseHealthCheck(req.dbApi.sequelize)
      .then(result => {
         res.status(200).json(result);
      }).catch(next);
});

router.all('/database/model/actions', (req, res, next) => {
   listModelActions(req.dbApi)
      .then(result => {
         res.status(200).json(result);
      }).catch(next);
});

const viewUsers = async (dbApi, paging = {}) => {
   try {
       const { page, limit, offset } = paging;
       const options = { raw: true, limit, offset };
       const User = dbApi.model('User');
       const data = await User.findAndCountAll(options);

       return data;
   } catch (error) {
       return error;
   }
};

router.get('/users', filterRequestPaging(), (req, res, next) => {
   viewUsers(req.dbApi, req.paging)
      .then(result => {
         res.status(200).json(result);
      }).catch(next);
});

module.exports = router;