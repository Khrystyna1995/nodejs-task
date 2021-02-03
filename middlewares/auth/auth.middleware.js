const jwt = require('jsonwebtoken');

const { BAD_REQUEST } = require('../../configs/error-codes');
const { NOT_EXIST_USER, NOT_VALID_BODY } = require('../../error/Errors');
const { compare } = require('../../helpers/password.helper');
const { authValidator } = require('../../validators');
const { AUTHORIZATION } = require('../../constants/constants');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../../configs/configs');
const { ErrorHandler, errors } = require('../../error');
const { authService } = require('../../services');

module.exports = {
    checkUserExist: async (req, res, next) => {
        try {
            const { email } = req.body;

            const user = await authService.findUserByParams({ email });

            if (!user) {
                throw new ErrorHandler(NOT_EXIST_USER.message, NOT_EXIST_USER.code);
            }

            req.user = user;
        } catch (e) {
            next(e);
        }
    },

    checkUserValid: (req, res, next) => {
        try {
            const { error } = authValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkPasswordHash: async (req, res, next) => {
        try {
            const { password, email } = req.body;

            const user = await authService.findUserByParams({ email });

            const isPasswordRight = await compare(password, user.password);

            if (!isPasswordRight) {
                throw new ErrorHandler(NOT_VALID_BODY.message, NOT_VALID_BODY.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            if (!access_token) {
                throw new ErrorHandler(errors.NOT_VALID_TOKEN.message, errors.NOT_VALID_TOKEN.code);
            }

            jwt.verify(access_token, ACCESS_TOKEN_SECRET, (err) => {
                if (err) {
                    throw new ErrorHandler(errors.NOT_VALID_TOKEN.message, errors.NOT_VALID_TOKEN.code);
                }
            });

            const userWithToken = await authService.getTokenWithUserByParams({ access_token });

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
    },

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
