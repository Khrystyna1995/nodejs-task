module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(
            'o_auth',
            {
                id: {
                    type: Sequelize.DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                access_token: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: false,
                    unique: true
                },
                refresh_token: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: false,
                    unique: true
                },
                user_id: {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: false,
                    foreignKey: true,
                    onDelete: 'cascade',
                    onUpdate: 'cascade',
                    references: {
                        model: 'users',
                        key: 'id'
                    }
                },
                created_at: {
                    type: Sequelize.DataTypes.DATE,
                    default: Sequelize.DataTypes.NOW
                }
            }
        );
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('o_auth', { cascade: true });
    }
};
