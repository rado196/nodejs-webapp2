const users = require('./users');
const jobs = require('./jobs');

module.exports = function (app) {
  app.use('/users', users);
  app.use('/jobs', jobs);
  // more routes here ...
};
