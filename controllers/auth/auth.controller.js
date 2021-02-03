const { authService } = require('../../services');
const tokenizer = require('../../helpers/tokenizer');
const { OK, NO_CONTENT } = require('../../configs/error-codes');
const { AUTHORIZATION } = require('../../constants/constants');
const { transactionInstance } = require('../../database').getInstance();

module.exports = {
    authUser: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            const token_pair = tokenizer();
            const user = req.body;

            delete user.password;

            await authService.createTokenPair({ user_id: user.id, ...token_pair, transaction });
            await transaction.commit();

            res.status(OK).json(token_pair);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            const access_token = req.header(AUTHORIZATION);

            await authService.deleteToken(access_token, transaction);
            await transaction.commit();

            res.status(NO_CONTENT);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            const { user_id } = req;
            await authService.deleteTokenById(user_id);

            const token_pair = tokenizer();

            await authService.createTokenPair({ user_id, ...token_pair, transaction });
            await transaction.commit();

            res.json(token_pair);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    }
};
