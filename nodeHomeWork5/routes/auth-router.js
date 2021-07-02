const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

router.post('/',
    authMiddleware.checkLoginValidation,
    authMiddleware.checkExistingLoginPassword,
    authController.getUserInfo);

module.exports = router;
