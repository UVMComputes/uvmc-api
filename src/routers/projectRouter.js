const router = require('express').Router();


const thenSendProject = (res, message = 'Could not find project.') => (response) => {
    if (response) {
        res.status(200).json({ success: true, project: response });
    } else {
        res.status(401).json({ success: false, message: message });
    }
};

const reqCreate = async (req, res, next) => {
    try {
        const { dbApi, body, params, query } = req;
        const { researcherId, name, urlSlug, about, readme, options } = body;

        if (!researcherId || !name || !urlSlug) {
            return res.status(422).json({ success: false, message: 'Invalid project data.' });
        }

        const Project = dbApi.model('Project');

        Project.create({ researcherId, name, urlSlug, about, readme, options })
            .then(thenSendProject(res, 'Could not find a project with that id.')).catch(next);
    } catch (error) {
        next(error);
    }
};

const reqFindAll = async (req, res, next) => {
    try {
        const { dbApi, body, params, query } = req;

        const Project = dbApi.model('Project');
        const data = await Project.findAll({});

        if (data) {
            const payload = (Array.isArray(data)) ? data : [data];
            res.status(200).json({ success: true, projects: payload });
        } else {
            res.status(401).json({ success: false, message: 'No projects found.', data });
        }
    } catch (error) {
        next(error);
    }
};

const reqFindById = async (req, res, next) => {
    try {
        const { dbApi, body, params, query } = req;
        const { projectId } = params;

        const Project = dbApi.model('Project');

        Project.findOne({ where: { id: projectId } })
            .then(thenSendProject(res, 'Could not find a project with that id.')).catch(next);
    } catch (error) {
        next(error);
    }
};

const reqUpdate = async (req, res, next) => {
    try {
        const { dbApi, body, params, query } = req;
        const { name, urlSlug, about, readme, options } = body;
        const { projectId } = params;

        if (!projectId) {
            return res.status(422).json({ success: false, message: 'Invalid project data.' });
        };

        const Project = dbApi.model('Project');
        
        const found = await Project.findOne({ where: { id: projectId } }).catch(next);
        
        if (!found) {
            return res.status(400).json({ success: false, message: 'Project not found.' });
        };

        found.name = name || found.name;
        found.urlSlug = urlSlug || found.urlSlug;
        found.about = about || found.about;
        found.readme = readme || found.readme;
        found.options = options || found.options;

        found.save().then(thenSendProject(res, 'Could not find a project with that id.')).catch(next);
    } catch (error) {
        next(error);
    }
};

const reqDelete = async (req, res, next) => {
    try {
        const { dbApi, body, params, query } = req;
        const { projectId } = params;

        const Project = dbApi.model('Project');
        const response = await Project.destroy({ where: { id: projectId } });

        if (response) {
            res.status(200).json({ success: true, message: 'Project deleted.' });
        } else {
            res.status(401).json({ success: false, message: 'Could not delete project.' });
        }
    } catch (error) {
        next(error);
    }
};


router.post('/', reqCreate);
router.get('/explore', reqFindAll);
router.get('/:projectId', reqFindById);
router.put('/:projectId', reqUpdate);
router.delete('/:projectId/delete', reqDelete);

module.exports = router;