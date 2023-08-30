const Project = require('../models/project');
const fs = require('fs');
const path = require('path');

// Requête POST création de projet
exports.createProject = (request, response, next) => {
    const projectObject = JSON.parse(request.body.project);
    delete projectObject._id;
    delete projectObject.userId;

    const project = new Project({
        ...projectObject,
        userId: request.auth.userId,
        imageUrl: `${request.protocol}://${request.get('host')}/images/${request.file.filename}`,
    });

    project
        .save()
        .then(() => {
            response.status(201).json({ message: 'Project enregistré avec succès' });
        })
        .catch((error) => {
            const imagePath = path.join(process.env.IMAGE_DIR, request.file.filename);
            fs.unlinkSync(imagePath);
            response.status(400).join({ error });
        });
};
