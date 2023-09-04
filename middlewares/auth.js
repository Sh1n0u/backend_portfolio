const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env.local' });

module.exports = (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ')[1];
        const secretKey = process.env.SECRET_KEY;

        const decodedToken = jwt.verify(token, secretKey);

        request.auth = {
            userId: decodedToken.userId,
        };
        next();
    } catch (error) {
        response.status(401).json({ error: 'Authentification échouée' });
    }
};
