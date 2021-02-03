module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },

            email: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                unique: true
            },

            password: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
            }
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('users');
    }
};
