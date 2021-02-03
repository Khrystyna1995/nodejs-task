module.exports = {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'SECRET',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'R_SECRET',

    ROOT_EMAIL: process.env.ROOT_EMAIL || 'mymail@gmail.com',
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || 'mypassword',
    ROOT_EMAIL_SERVICE: process.env.ROOT_EMAIL_SERVICE || 'gmail'
};
