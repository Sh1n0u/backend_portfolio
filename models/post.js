const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: { type: String, require: true },
    email: { type: String, require: true },
    message: { type: String, require: true },
});

module.exports = mongoose.model('Post', postSchema);
