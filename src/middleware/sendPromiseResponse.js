
const httpStatus = require('../lib/utils/httpResponseStatus');


const addPromiseResponseMethod = (responseFormat = 'json') => {
    return (req, res, next) => {

        const isPromise = item => !!item && typeof item.then === 'function';
        const isMethod = item => !!item && typeof item === 'function';
        const isDataModel = item => !!item && typeof item.get === 'function'; // toJSON

        const formatPayload = (key, value) => {
            let payload;
            switch (true) {
                case isDataModel(value):
                    payload = item.get();
                    break;
                default:
                    payload = JSON.parse(JSON.stringify(item));
                    break;
            }
            return {
                http: httpStatus.defaultSuccess,
                [key]: payload
            };
        };

        res.promise = (next, action, key = 'payload') => {
            let responsePromise;
            switch (true) {
                case isMethod(action):
                    responsePromise = Promise.resolve().then(i => action());
                    break;
                case isPromise(action):
                    responsePromise = action;
                    break;
                default:
                    responsePromise = Promise.resolve(action);
                    break;
            }

            return responsePromise.then(payload => {
                res.status(200).json(formatPayload(key, payload));
            }).catch(next);
        }
        
        next();
    };
};

module.exports = addPromiseResponseMethod;

