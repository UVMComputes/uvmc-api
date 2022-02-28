const adminRouter = require('./adminRouter');
const authRouter = require('./authRouter');
const computingRouter = require('./computingRouter');
const exploreRouter = require('./exploreRouter');
const projectRouter = require('./projectRouter');

const { ReqRouteNotFoundError } = require('../lib/errors');



const appRouter = require('express').Router();

appRouter.all(
    ['/', '/ping', '/info', '/test'],
    (req, res) => res.status(200).json({ 'uvmcomputes': '1.0.0', 'api': 'live', 'timestamp': moment().utc() })
);


appRouter.use('/auth', authRouter);
appRouter.use('/computing', computingRouter);
appRouter.use('/explore', exploreRouter);
appRouter.use('/project', projectRouter);
appRouter.use('/admin', adminRouter);

/** 
 * Custom error response handler
 */

// 404 Error for any other route requests
appRouter.all('*', ReqRouteNotFoundError.routeHandler);



module.exports = appRouter;