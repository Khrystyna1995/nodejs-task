const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const db = require('./database').getInstance();
require('dotenv').config();
const deleteToken = require('./cron-jobs');

const app = express();

db.setModels();

app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(process.cwd(), 'public')));

const { usersRouter, authRouter } = require('./routes');

// AUTH
app.use('/auth', authRouter);

// USERS
app.use('/users', usersRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.code)
        .json({
            message: err.message,
            ok: false
        });
});

app.listen(5000, async () => {
    // eslint-disable-next-line no-console
    console.log('App listen 5000');
    await deleteToken();
});
