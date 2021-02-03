const { OK, CREATED } = require('../../configs/error-codes');
const { usersService } = require('../../services');
const { ErrorHandler, errors } = require('../../error');
const { hash } = require('../../helpers/password.helper');
const { transactionInstance } = require('../../database').getInstance();

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await usersService.getUsers();

            res.status(OK).json(users);
        } catch (e) {
            next(e);
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            if (user_id < 0) {
                throw new ErrorHandler(errors.NOT_VALID_ID.message, errors.NOT_VALID_ID.code);
            }

            const user = await usersService.getUserById(user_id);

            res.status(OK).json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            const password = await hash(req.body.password);
            const newUser = await usersService.createUser({ ...req.body }, password, transaction);
            await transaction.commit();

            res.status(CREATED).json(newUser);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            const { user_id } = req.params;
            // eslint-disable-next-line no-unused-vars
            const { user, password, phone } = req.body;

            const newPhone = await (user.phone);

            if (!password) {
                await usersService.updateUser(user_id, user);

                return res.sendStatus(OK);
            }

            const newPassword = await hash(user.password);

            await usersService.updateUser(user, user_id, newPassword, newPhone, transaction);
            await transaction.commit();

            res.status(OK);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },
};
