const express = require('express');
const router = express.Router();
const projectController = require('../controller/project-controller');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.post('/projects', auth, multer, projectController.createProject);

module.exports = router;