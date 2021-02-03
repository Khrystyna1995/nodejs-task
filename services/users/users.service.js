const database = require('../../database').getInstance();

module.exports = {
    createUser: (user, hashedPassword, phone, transaction) => {
        const User = database.getModel('User');

        return User.create({
            name: user.name,
            email: user.email,
            password: hashedPassword,
            phone: user.phone
        },
        { transaction });
    },

    getUsers: () => {
        const User = database.getModel('User');

        return User.findAll();
    },

    getUserById: (user_id) => {
        const User = database.getModel('User');

        return User.findByPk(user_id);
    },

    getUserByEmail: (email) => {
        const User = database.getModel('User');

        return User.findOne({
            where: {
                email
            }
        });
    },

    updateUser: (updatedUser, user_id, newPassword, newPhone, transaction) => {
        const User = database.getModel('User');

        return User.update({
            name: updatedUser.name,
            email: updatedUser.email,
            password: newPassword,
            phone: newPhone,
        },
        {
            where: {
                id: user_id
            },
            transaction
        },);
    },
};
