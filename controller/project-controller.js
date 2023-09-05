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
            response.status(201).json({ message: 'Projet enregistré avec succès' });
        })
        .catch((error) => {
            const imagePath = path.join(process.env.IMAGE_DIR, request.file.filename);
            fs.unlinkSync(imagePath);
            response.status(400).json({ error });
        });
};

exports.getAllProject = (request, response, next) => {
    Project.find()
        .then((projects) => {
            console.log('Données des projets:', projects);
            response.status(200).json(projects);
        })
        .catch((error) => {
            console.error('Erreur lors de la récupération des projets:', error);
            response.status(500).json({ error });
        });
};

exports.updateProject = (request, response, next) => {
    const projectObject = request.file
        ? {
              ...JSON.parse(request.body.project),
              imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
          }
        : { ...request.body };

    delete projectObject._userId;
    Project.findOne({ _id: request.params.id })
        .then((project) => {
            console.log('request.auth.userId:', request.auth.userId);
            console.log('project.userId:', project.userId);
            if (project.userId != request.auth.userId) {
                response.status(401).json({ message: 'Non autorisé' });
            } else {
                Project.updateOne({ _id: request.params.id }, { ...projectObject, _id: request.params.id })
                    .then(() => response.status(200).json({ message: 'Projet modifié' }))
                    .catch((error) => response.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.deleteProject = (request, response, next) => {
    const projectId = request.params.id;

    Project.findOne({ _id: projectId})
        .then((project) => {
            // Vérification de la présence du projet
            if (!project) {
                return response(404).json({ message: 'Projet non trouvé'})
            }

            // Vérification de l'autorisation du user
            if (project.userId !== request.auth.userId) {
                response.status(401).json({ message: 'Non autorisé'})
            }

            // Suppression de l'image du projet
            const imagePath = path.join(process.env.IMAGE_DIR, project.imageUrl.split('/images')[1])
            fs.unlinkSync(imagePath)

            // Suppression du projet
            Project.deleteOne({ _id: projectId})
                .then(() => {
                    response.status(200).json({ message: 'Projet supprimé avec succès'})
                })
                .catch((error) => {
                    response.status(400).json({ error })
                })
        })
}