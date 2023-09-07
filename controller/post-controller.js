const Post = require('../models/post');

exports.createPost = (request, response, next) => {
    const post = new Post({
        email: request.body.email,
        message: request.body.message,
        userId: request.userId,
    });

    post.save()
        .then(() => {
            response.status(201).json({ message: 'Message envoyé' });
        })
        .catch((error) => {
            response.status(400).json({ error });
        });
};

exports.getAllPost = (request, response, next) => {
    Post.find()
        .then((post) => {
            response.status(200).json(post);
        })
        .catch((error) => {
            response.status(500).json({ error });
        });
};
