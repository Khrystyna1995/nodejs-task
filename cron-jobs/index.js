const cron = require('node-cron');
const deleteToken = require('./delete-token');

module.exports = () => {
    cron.schedule('deleted token', async () => {
        await deleteToken();
        console.log('deleted token');
    });
};
