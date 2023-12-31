const Post = require('../models/post');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

exports.createPost = async (request, response, next) => {
    try {
        const post = new Post({
            email: request.body.email,
            message: request.body.message,
            userId: request.userId,
        });

        await post.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.ADMIN_USER,
                pass: process.env.ADMIN_PWD,
            },
        });

        const { email, message } = request.body;

        const mailOptions = {
            from: process.env.ADMIN_USER,
            to: process.env.ADMIN_USER,
            subject: 'Nouveau commentaire',
            text: `Nouveau commentaire de ${email} :\n\n${message}`,
        };

        // Envoi de l'e-mail
        await transporter.sendMail(mailOptions);

        response.status(201).json({ message: 'Message envoyé avec succès' });
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'e-mail ou de la sauvegarde du commentaire :", error);
        response.status(500).json({ message: "Erreur lors de l'envoi du commentaire" });
    }
};

exports.getAllPost = (request, response, next) => {
    Post.find()
        .then((posts) => {
            response.status(200).json(posts);
        })
        .catch((error) => {
            response.status(500).json({ error });
        });
};
