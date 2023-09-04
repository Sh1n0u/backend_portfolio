const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: 'env.local' });

exports.login = async (request, response) => {
    let user = await User.findOne({ email: request.body.email });

    if (user) {
        const passwordOk = await bcrypt.compare(request.body.password, user.password);
        if (!passwordOk) {
            return response.status(401).json({ message: 'Adresse mail ou mot de passe incorrect' });
        }
    } else {
        if (request.body.email === ADMIN_USER) {
            const hashedPassword = await bcrypt.hash(request.body.password, 13);
            user = new User({
                email: request.body.email,
                password: hashedPassword,
            });
            await user.save();
        } else {
            return response.status(401).json({ message: 'Adresse mail ou mot de passe incorrect' });
        }
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '6h' });
    return response.status(200).json({ message: 'Connexion réussi', token: token });
};
