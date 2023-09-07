const Post = require('../models/post')

exports.createPost = (request, response, next) => {
    const post = new Post({
        email: request.boby.email,
        message: request.body.message,
        userId: request.userId,
    })

    Post
        .save()
        .then(() => {
            response.status(201).json({ message: 'Message envoyé'})
        })
        .catch((error) => {
            response.status(400).json({ error })
        })
}