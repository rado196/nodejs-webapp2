const JobService = require('../services/JobService');

// GET: /jobs
module.exports.getList = async function (req, res) {
  try {
    const jobs = await JobService.getList();
    res.json({ status: 'OK', jobs: jobs });
  } catch (e) {
    res.status(400).json({ status: 'failure' });
  }
};

// GET: /jobs/:id
module.exports.getById = async function (req, res) {
  try {
    const job = await JobService.getById({
      jobId: req.params.id,
    });
    res.json({ status: 'OK', job: job });
  } catch (e) {
    res.status(400).json({ status: 'failure' });
  }
};
