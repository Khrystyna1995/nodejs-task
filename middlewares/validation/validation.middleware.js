const { ErrorHandler } = require('../../error');
const { BAD_REQUEST } = require('../../configs/error-codes');
const { usersValidator, updateValidator } = require('../../validators');

module.exports = {
    checkUserIdValid: (req, res, next) => {
        try {
            const { id } = req.params;

            const { error } = usersValidator.validate(id);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserValid: (req, res, next) => {
        try {
            const { error } = usersValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserUpdateValid: (req, res, next) => {
        try {
            const { error } = updateValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

};
