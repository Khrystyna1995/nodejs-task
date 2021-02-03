const { usersService } = require('../../services');
const { EXIST_USER, NOT_EXIST_USER } = require('../../error/Errors');
const { ErrorHandler } = require('../../error');

module.exports = {
    checkIsUserRegistered: async (req, res, next) => {
        try {
            const { email } = req.body;
            const user = await usersService.getUserByEmail(email);

            if (user) {
                throw new ErrorHandler(EXIST_USER.message, EXIST_USER.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserIdExist: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const user = await usersService.getUserById(user_id);

            if (!user) {
                throw new ErrorHandler(NOT_EXIST_USER.message, NOT_EXIST_USER.code);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },
};
