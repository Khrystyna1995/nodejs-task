const { authService } = require('../services');

module.exports = async () => {
    await authService.deleteToken({ });
};
