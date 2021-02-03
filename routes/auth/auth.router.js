const { Router } = require('express');
const { authController } = require('../../controllers');
const { authMiddleware } = require('../../middlewares');

const authRouter = Router();

authRouter.post('/', authMiddleware.checkUserValid,
    authMiddleware.checkUserExist, authMiddleware.checkPasswordHash,
    authController.authUser);
authRouter.get('/logout', authController.logoutUser);
authRouter.post('/:id/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);

module.exports = authRouter;
