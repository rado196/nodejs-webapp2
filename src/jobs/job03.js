const asyncSleep = require('../helpers/sleep');

module.exports.name = 'job_03';
module.exports.interval = 120;

module.exports.handler = async function (logger) {
  logger.info('Starting to do some log task, please wait..');
  await asyncSleep(145);
};
