const Post = require('../models/post');
const nodemailer = require('nodemailer');

exports.createPost = (request, response, next) => {
    const post = new Post({
        email: request.body.email,
        message: request.body.message,
        userId: request.userId,
    });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.ADMIN_USER,
            pass: process.env.ADMIN_PWD,
        },
    });

    try {
        const { email, message } = request.body;

        const mailOptions = {
            from: process.env.ADMIN_USER,
            to: process.env.ADMIN_USER,
            subject: 'Nouveau commentaire',
            text: `Nouveau commentaire de ${email} :\n\n${message}`,
        };

        // Envoi de l'e-mail
        transporter.sendMail(mailOptions);
        response.status(200).json({ message: 'Commentaire envoyé avec succès' });
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'e-mail :", error);
        response.status(500).json({ message: "Erreur lors de l'envoi du commentaire" });
    }

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
