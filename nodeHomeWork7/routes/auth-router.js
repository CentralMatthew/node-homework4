const router = require('express').Router();

const { authController } = require('../controllers');
const { userMiddleware, authMiddleware } = require('../middlewares');

router.post('/login',
    authMiddleware.checkLoginValidity,
    userMiddleware.getUserByDynamicParam('email'),
    authController.login);

router.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logout);

router.post('/refresh', authMiddleware.checkRefreshToken, authController.refresh);

module.exports = router;
