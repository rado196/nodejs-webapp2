const express = require('express');
const router = express.Router();

const JobController = require('../controllers/JobController');

router.get('/', JobController.getList);
router.get('/:id', JobController.getById);

module.exports = router;
