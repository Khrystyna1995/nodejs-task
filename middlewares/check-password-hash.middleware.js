const { findUserByParams } = require('../services/auth/auth.service');
const { compare } = require('../helpers/password.helper');

module.exports = async (req, res, next) => {
    try {
        const { password, email } = req.body;

        const user = await findUserByParams({ email });

        if (!user) {
            throw new Error('W E O P');
        }

        await compare(password, user.password);

        req.user = user;

        next();
    } catch (e) {
        next(e);
    }
};
