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
    const projectId = request.params.id;

    Project.findById(projectId)
        .then((project) => {
            // Affichage d'erreur si le projet n'existe pas
            if (!project) {
                return response.status(404).json({ message: 'Projet non trouvé' });
            }

            // Sauvegarder le chemin de l'ancien fichier image
            const oldImagePath = path.join(process.env.IMAGE_DIR, path.basename(project.imageUrl));

            // Met à jour le projet avec les nouvelles données
            if (request.body.title) {
                project.title = request.body.title;
            }

            if (request.body.description) {
                project.description = request.body.description;
            }

            // Met à jour le projet avec la nouvelle image si elle est fournie
            if (request.file) {
                project.imageUrl = `${request.protocol}://${request.get('host')}/images/${request.file.filename}`;
            }

            // Enregistrez le projet mis à jour
            return project.save();
        })
        .then(() => {
            // Supprime l'ancienne image après avoir enregistré
            if (request.file && fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath, (error) => {
                    if (error) {
                        console.error("Erreur lors de la suppression de l'ancienne image", error);
                    }
                });
            }

            response.status(200).json({ message: 'Projet mis à jour' });
        })
        .catch((error) => {
            const imagePath = path.join(process.env.IMAGE_DIR, request.file.name);
            fs.unlinkSync(imagePath);
            response.status(400).json({ error });
        });
};
