const express = require('express');
const { addSkill } = require('../countrollers/skillsController');
const router = express.Router();


// POST endpoint to add skills
router.post('/add', addSkill);

module.exports = router;