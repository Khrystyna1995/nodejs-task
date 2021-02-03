const fs = require('fs');
const path = require('path');
const { resolve } = require('path');
const { Sequelize } = require('sequelize');

module.exports = (() => {
    let instance;

    const initConnection = () => {
        const client = new Sequelize('users_task', 'root', '29031995k', {
            host: 'localhost',
            dialect: 'mysql'
        });

        const models = {};
        const modelsPath = path.join(process.cwd(), 'database', 'models');

        const getModels = () => {
            fs.readdirSync(modelsPath)
                .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
                .forEach(async (file) => {
                    // eslint-disable-next-line import/no-dynamic-require
                    const model = require(resolve(`${modelsPath}/${file}`))(client, Sequelize.DataTypes);
                    // models[model.name] = model.sync();
                    models[model.name] = await model.sync();
                });
        };

        return {
            setModels: () => getModels(),
            getModel: (modelName) => models[modelName],
            transactionInstance: () => client.transaction()
        };
    };

    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection();
            }

            return instance;
        }
    };
})();
