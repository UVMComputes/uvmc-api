const router = require('express').Router();


const thenSendProfile = (res, message = 'Could not authenticate user.') => (response) => {
    if (response) {
        res.status(200).json({ success: true, profile: response });
    } else {
        res.status(401).json({ success: false, message: message });
    }
}

// Validate a user authentication token
router.post('/validate', (req, res, next) => {
    const { dbApi, body, params, query } = req;
    const { authToken } = body;

    if (!authToken) return res.status(401).json({ success: false, message: 'Could not validate session.' });

    const SecurityToken = dbApi.model('SecurityToken');
    const User = dbApi.model('User');

    SecurityToken.selectValidSession(authToken)
        .then(response => {
            if (!response || !response.userId) {
                return res.status(401).json({ success: false, message: 'Session has expired.' });
            }

            User.getUserAuthProfile(response.userId)
                .then(thenSendProfile(res, 'Could not authenticate session.')).catch(next);
        }).catch(next);
});

// Login with a username and password
router.post('/register', async (req, res, next) => {
    const { dbApi, body, params, query } = req;
    const { email, password, firstName, lastName, displayName, settings } = body;
    const { isResearcher, urlSlug, bio } = body;

    const User = dbApi.model('User');
    const existing = await User.findOne({
        attributes: ['id'],
        where: { email: email }
    }).catch(next);

    if (existing) {
        return res.status(401).json({ success: false, message: 'An account with that email already exists.' });
    }

    let researcherId = null;
    if (isResearcher && isResearcher === 'true') {
        const Researcher = dbApi.model('Researcher');
        const newResearcher = await Researcher.create({ urlSlug, bio }).catch(next);
        researcherId = newResearcher.id;
    }

    const SecurityLevel = dbApi.model('SecurityLevel');
    const securityLevel = (researcherId) ?
        await SecurityLevel.selectLevelResearcher().catch(next) :
        await SecurityLevel.selectLevelUser().catch(next);
        

    const securityLevelId = (securityLevel && securityLevel.id) ? securityLevel.id : 0;

    const newUser = await User.create({ securityLevelId, email, password, firstName, lastName, displayName, researcherId, settings }).catch(next);

    User.getUserAuthProfile(newUser.id)
        .then(thenSendProfile(res, 'Could not authenticate session.')).catch(next);
});

// Login with a username and password
router.post('/login', (req, res, next) => {
    const { dbApi, body, params, query } = req;
    const { email, password } = body;

    if (!email || !password) return res.status(401).json({ success: false, message: 'Could not log in with those credentials.' });

    const User = dbApi.model('User');

    User.verifyLoginCredentials(email, password)
        .then(thenSendProfile(res, 'Username and password do not match.')).catch(next);
});

// Logout a authentication token
router.post('/logout', (req, res, next) => {
    const { dbApi, body, params, query } = req;
    const { authToken } = body;

    if (!authToken) return res.status(200).json({ success: true, message: 'Logout complete.' });

    const SecurityToken = dbApi.model('SecurityToken');

    SecurityToken.deleteToken(authToken)
        .then(response => {
            res.status(200).json({ success: true, message: 'Logout success.' });
        }).catch(next);
});

// Get security levels for authenticated user access
router.get('/security-levels', (req, res, next) => {
    console.dir(req.path);
    res.send(req.path);
});

module.exports = router;