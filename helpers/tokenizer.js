const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../configs/configs');
const { ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME } = require('../constants/constants');

module.exports = () => {
    const access_token = jwt.sign({}, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_TIME });
    const refresh_token = jwt.sign({}, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_TIME });

    return {
        access_token,
        refresh_token
    };
};
