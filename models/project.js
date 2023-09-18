const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    userId: { type: String, require: true },
    title: { type: String, require: true },
    imageUrl: { type: String, require: true },
    description: { type: String, require: true },
    selected: { type: Boolean, require: true, default: false}
});

module.exports = mongoose.model('Project', projectSchema);
