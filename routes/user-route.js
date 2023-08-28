const express = require('express');
const router = express.Router();
const userController = require('../controller/user-controller');

router.post('/authentification/login', userController.login);

module.exports = router;
