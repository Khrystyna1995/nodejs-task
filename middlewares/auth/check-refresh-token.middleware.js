const jwt = require('jsonwebtoken');

const { AUTHORIZATION } = require('../../constants/constants');
const { REFRESH_TOKEN_SECRET } = require('../../configs/configs');
const { ErrorHandler, errors } = require('../../error');
const { authService } = require('../../services');

module.exports = {
    checkRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);

            if (!refresh_token) {
                throw new ErrorHandler(errors.NOT_VALID_TOKEN.message, errors.NOT_VALID_TOKEN.code);
            }

            jwt.verify(refresh_token, REFRESH_TOKEN_SECRET, (err) => {
                if (err) {
                    throw new ErrorHandler(errors.NOT_VALID_TOKEN.message, errors.NOT_VALID_TOKEN.code);
                }
            });

            const userWithToken = await authService.getTokenWithUserByParams({ refresh_token });

            if (!userWithToken) {
                throw new ErrorHandler(errors.NOT_VALID_TOKEN.message, errors.NOT_VALID_TOKEN.code);
            }

            if (userWithToken.id !== +req.params.id) {
                throw new Error(errors.PERMISSION_DENIED.message, errors.PERMISSION_DENIED.code);
            }

            req.user = userWithToken;

            next();
        } catch (e) {
            next(e);
        }
    }
};
