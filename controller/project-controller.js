const Project = require('../models/project');
const fs = require('fs');
const path = require('path');

// Requête POST création de projet
exports.createProject = (request, response, next) => {
    const project = new Project({
        title: request.body.title,
        description: request.body.description,
        imageUrl: `${request.protocol}://${request.get('host')}/images/${request.file.filename}`,
        userId: request.auth.userId,
    });

    project
        .save()
        .then(() => {
            response.status(201).json({ message: 'Project enregistré avec succès' });
        })
        .catch((error) => {
            const imagePath = path.join(process.env.IMAGE_DIR, request.file.filename);
            fs.unlinkSync(imagePath);
            response.status(400).json({ error });
        });
};
