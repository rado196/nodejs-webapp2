const { Job } = require('../models');

module.exports.getList = async function (transaction) {
  const jobs = await Job.findAll({
    where: { finishedAt: null },
    attributes: {
      exclude: ['logs'],
    },
    transaction: transaction,
  });

  return jobs;
};

module.exports.getById = async function ({ jobId }, transaction) {
  const job = await Job.findOne({
    where: { id: jobId },
    transaction: transaction,
  });

  return job;
};
