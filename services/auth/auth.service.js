const database = require('../../database').getInstance();

module.exports = {
    findUserByParams: (email) => {
        const UserModel = database.getModel('User');

        return UserModel.findOne({
            where: email
        });
    },

    createTokenPair: (tokenPair, transaction) => {
        const AuthModel = database.getModel('O_Auth');

        return AuthModel.create(tokenPair, transaction);
    },

    getTokenWithUserByParams: (findObject) => {
        const AuthModel = database.getModel('O_Auth');
        const UserModel = database.getModel('User');

        return UserModel.findOne({
            include: {
                model: AuthModel,
                where: findObject
            }
        });
    },

    deleteTokenById: (id) => {
        const AuthModel = database.getModel('O_Auth');

        return AuthModel.destroy({
            where:
                { id }
        });
    },

    deleteToken: (access_token, transaction) => {
        const AuthModel = database.getModel('O_Auth');

        return AuthModel.destroy({
            where:
                { access_token },
            transaction
        });
    }

};
