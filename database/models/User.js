module.exports = (client, DataTypes) => {
    const User = client.define('User',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.INTEGER,
                primaryKey: true
            }
        },
        {
            tableName: 'users',
            timestamps: false
        });

    const OAuth = require('./O_Auth')(client, DataTypes);

    User.hasOne(OAuth, {
        foreignKey: 'user_id',
        onDelete: 'cascade'
    });
    return User;
};
