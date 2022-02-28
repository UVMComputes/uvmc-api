const filterRequestPaging = require('../middleware/filterRequestPaging');
const router = require('express').Router();

const exploreProjects = async (dbApi,  paging = {}) => {
    try {
        const { page, limit, offset } = paging;
        const options = { raw: true, limit, offset };
        const Project = dbApi.model('Project');
        const data = await Project.findAndCountAll(options);

        return  { page, limit, total: data.count, data: data.rows };
    } catch (error) {
        return error;
    }
};


const exploreResearchers = async (dbApi, paging = {}) => {
    try {
        const { page, limit, offset } = paging;
        const options = { raw: true, limit, offset };
        const Researcher = dbApi.model('Researcher');
        const data = await Researcher.findAndCountAll(options);

        return  { page, limit, total: data.count, data: data.rows };
    } catch (error) {
        return error;
    }
};

router.use(filterRequestPaging());

router.get('/projects', (req, res, next) => {
    exploreProjects(req.dbApi, req.paging)
        .then(result => {
            res.status(200).json(result);
        }).catch(next);
});

router.get('/researchers', (req, res, next) => {
    exploreResearchers(req.dbApi, req.paging)
        .then(result => {
            res.status(200).json(result);
        }).catch(next);
});

module.exports = router;