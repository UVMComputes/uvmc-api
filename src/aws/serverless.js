// TODO:        Make sure you: configure node Environment Variables for your app
/* Required Variables
NODE_ENV=development
MYSQL_USERNAME=dbuser
MYSQL_PASSWORD=dbpassword
MYSQL_DB_NAME=uvmcomputes
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_DIALECT=mysql
CORS_ORIGIN=http://localhost:3000/
EXPRESS_PORT=8000
*/
const app = require('../app')('development');
const handler = require('serverless-http')(app);



module.exports = handler;
module.exports.handler = handler;
module.exports.default = handler;