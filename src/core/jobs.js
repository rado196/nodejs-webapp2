const path = require('node:path');
const fs = require('node:fs');

const logger = require('../helpers/logger');
const models = require('../models');

const jobsPath = path.join(__dirname, '..', 'jobs');
const jobs = fs.readdirSync(jobsPath).map(function (fileName) {
  const jobPath = path.join(jobsPath, fileName);
  const { name, interval, handler } = require(jobPath);

  return { name, interval, handler };
});

async function checkAndRunJob({ server, name, handler }) {
  const [job, created] = await models.Job.findOrCreate({
    where: {
      name: name,
      finishedAt: null,
    },
    defaults: {
      server: server,
      name: name,
      startedAt: new Date().toISOString(),
    },
  });

  if (!created) {
    return;
  }

  const loggerInstance = logger.build(job);
  loggerInstance.info(`Job started.`);

  try {
    await handler(loggerInstance);
  } catch (e) {
    loggerInstance.fatal(e.message || 'UnknownError');
    loggerInstance.fatal(e.stack || 'unknown-stack');
  }
  loggerInstance.info(`Job finished.`);

  job.setDataValue('finishedAt', new Date().toISOString());
  await job.save();
}

async function cleanUpUnfinishedTasks({ server, name }) {
  await models.Job.update(
    {
      finishedAt: new Date().toISOString(),
    },
    {
      where: {
        server: server,
        name: name,
        finishedAt: null,
      },
    }
  );
}

async function registerJob(server, { name, interval, handler }) {
  await cleanUpUnfinishedTasks({ server, name });
  checkAndRunJob({ server, name, handler });

  setInterval(function () {
    checkAndRunJob({ server, name, handler });
  }, interval * 1000);
}

module.exports = function (server) {
  jobs.forEach(function (job) {
    registerJob(server, job);
  });
};
