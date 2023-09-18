const express = require('express');
const router = express.Router();
const projectController = require('../controller/project-controller');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.post('/projects', auth, multer, projectController.createProject);
router.get('/projects', projectController.getAllProject);
router.get('/projects/selected', projectController.getSelectedProject);
router.put('/projects/:id', auth, multer, projectController.updateProject);
router.delete('/projects/:id', auth, multer, projectController.deleteProject)

module.exports = router;
