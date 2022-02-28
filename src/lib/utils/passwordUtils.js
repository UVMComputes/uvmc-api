/** 
 * Password hashing and comparing utilities.
 * https://github.com/dcodeIO/bcrypt.js
 */
const { hashSync, compareSync } = require('bcryptjs');



const saltRounds = 10;
const encryptPassword = (password) => (typeof password === 'string') ? hashSync(password, saltRounds) : null;


const doPasswordsMatch = (password, hash) => compareSync(password, hash);



const passwordUtils = {
    encryptPassword,
    doPasswordsMatch,
};

module.exports = passwordUtils;
module.exports.passwordUtils = passwordUtils;
module.exports.default = passwordUtils;