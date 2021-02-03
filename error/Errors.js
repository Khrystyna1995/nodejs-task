const {
    OK, CREATED, NO_CONTENT, BAD_REQUEST, FORBIDDEN, UNAUTHORIZED
} = require('../configs/error-codes');

module.exports = {
    NOT_VALID_ID: {
        message: 'User ID must be grater than 0',
        code: BAD_REQUEST
    },
    NOT_VALID_BODY: {
        message: 'Request is not valid',
        code: FORBIDDEN
    },
    CREATED_USER: {
        message: 'Created',
        code: CREATED
    },
    REQUESTED_USER: {
        message: 'Success',
        code: OK
    },
    DELETED_USER: {
        message: 'Deleted',
        code: NO_CONTENT
    },
    EXIST_USER: {
        message: 'This user already exist',
        code: FORBIDDEN
    },
    NOT_EXIST_USER: {
        message: 'This user is not exist',
        code: NO_CONTENT
    },
    WRONG_DATA: {
        message: 'Wrong password',
        code: BAD_REQUEST
    },
    WRONG_TEMPLATE_NAME: {
        message: 'wrong template name',
        code: BAD_REQUEST
    },
    NOT_VALID_TOKEN: {
        message: 'Not valid token',
        code: UNAUTHORIZED
    },
    PERMISSION_DENIED: {
        message: 'Permission denied',
        code: FORBIDDEN
    }
};
