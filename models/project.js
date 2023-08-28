const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title: { type: String, require: true },
    imageUrl: { type: String, require: true },
    description: { type: String, require: true },
});

module.exports = mongoose.model('Project', projectSchema);
