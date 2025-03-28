// routes/jobRoutes.js

const express = require('express');
const jobController = require('../countrollers/jobController');  // Corrected the folder name here

const router = express.Router();

router.post('/dashboard/client/create', jobController.createJob);
router.get('/dashboard/client/all', jobController.getJobs);

module.exports = router;
