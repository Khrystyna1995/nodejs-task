const { Router } = require('express');
const { validationMiddleware, usersMiddleware } = require('../../middlewares');
const { usersController } = require('../../controllers');

const usersRouter = Router();

usersRouter.get('/', usersController.getUsers);
usersRouter.get('/:user_id', validationMiddleware.checkUserIdValid, usersController.getUserById);
// eslint-disable-next-line max-len
usersRouter.post('/', validationMiddleware.checkUserValid, usersMiddleware.checkIsUserRegistered, usersController.createUser);

// eslint-disable-next-line max-len
usersRouter.put('/:user_id', usersMiddleware.checkUserIdExist, validationMiddleware.checkUserUpdateValid, usersController.updateUser);

module.exports = usersRouter;
