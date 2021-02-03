const bcrypt = require('bcrypt');

const { errors: { WRONG_DATA }, ErrorHandler } = require('../error');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hash) => {
        const isPasswordTrue = await bcrypt.compare(password, hash);

        if (!isPasswordTrue) {
            throw new ErrorHandler(WRONG_DATA.message, WRONG_DATA.code);
        }
    }
};
