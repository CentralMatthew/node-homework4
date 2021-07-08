const router = require('express').Router();

const { userController } = require('../controllers');
const {
  userMiddleware: {
    checkUserValidity, getUserByDynamicParam, isEmailBusy
  },
  authMiddleware: { checkAccessToken }
} = require('../middlewares');

router.get('/', userController.getAllUsers);

router.post('/', checkUserValidity, isEmailBusy, userController.createUser);

router.use('/:userId', getUserByDynamicParam('userId', 'params', '_id'));

router.get('/:userId', userController.getUserById);

router.delete('/:userId', checkAccessToken, userController.deleteUser);

router.patch('/:userId', checkAccessToken, checkUserValidity, userController.updateUser);

module.exports = router;
