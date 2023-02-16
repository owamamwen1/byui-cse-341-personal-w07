const express = require('express');
const router = express.Router();
require('dotenv').config();

const userController = require('../controllers/user');

router.get('/', userController.getAll);
router.get('/:username', userController.getUser);
router.post('/', userController.create);
router.put('/:username', userController.updateUser);
router.delete('/:username', userController.deleteUser);

module.exports = router;
