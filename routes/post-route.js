const express = require('express')
const router = express.Router()
const postController = require('../controller/post-controller')

router.post('/posts', postController.createPost)

module.exports = router