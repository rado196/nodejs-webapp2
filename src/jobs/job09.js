const asyncSleep = require('../helpers/sleep');

module.exports.name = 'job_09';
module.exports.interval = 120;

module.exports.handler = async function (logger) {
  logger.info('Starting to do some log task, please wait..');
  await asyncSleep(162);
};
