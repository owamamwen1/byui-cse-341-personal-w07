const express = require('express');
require('dotenv').config();
const router = express.Router();

const facultyController = require('../controllers/faculty');

router.get('/:facultyName', facultyController.getFaculty);

module.exports = router;
