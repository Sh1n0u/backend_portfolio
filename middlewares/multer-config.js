const multer = require('multer');

const MIME_TYPE = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
};

const storage = multer.diskStorage({
    destination: (request, response, callback) => {
        callback(null, process.env.IMG_DIR);
    },
    filename: (request, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPE[file.mimetype];
        callback(null, name + '_' + Date.now() + '.' + extension);
    },
});

module.exports = multer({ storage: storage }).single('image');
