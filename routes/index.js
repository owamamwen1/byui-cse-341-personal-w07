const express = require('express');
require('dotenv').config();
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/user', require('./user'));
router.use('/faculty', require('./faculty'));

module.exports = router;
