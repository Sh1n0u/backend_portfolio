const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.ADMIN_USER,
        pass: process.env.ADMIN_PWD,
    },
});

app.post('/api/comment', async (request, response) => {
    try {
        const { email, message } = request.body;

        const mailOptions = {
            from: process.env.ADMIN_USER,
            to: process.env.ADMIN_USER,
            subject: 'Nouveau commentaire',
            text: `Nouveau commentaire de ${email} :\n\n${message}`,
        };

        // Envoi de l'e-mail
        await transporter.sendMail(mailOptions);
        response.status(200).json({ message: 'Commentaire envoyé avec succès' });
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'e-mail :", error);
        response.status(500).json({ message: "Erreur lors de l'envoi du commentaire" });
    }
});

