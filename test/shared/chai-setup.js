// test/shared/chai-setup.js

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);


module.exports = chai;