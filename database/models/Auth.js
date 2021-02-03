module.exports = (client, DataTypes) => client.define(
    'O_Auth',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        access_token: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        refresh_token: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            foreignKey: true,
            onDelete: 'cascade',
            onUpdate: 'cascade',
            reference: {
                model: {
                    tableName: 'users',
                    schema: 'users_task'
                },
                key: 'id'
            }
        },
        create_at: {
            type: DataTypes.DATE,
            default: client.fn('NOW')
        }
    },
    {
        tableName: 'o_auth',
        timestamps: false
    }
);
