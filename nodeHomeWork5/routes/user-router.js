const router = require('express').Router();

const { userController } = require('../controllers');
const {
    isEmailBusy, userIsNotExist, checkUserValidity
} = require('../middlewares/user-middleware');

router.get('/', userController.getAllUsers);

router.post('/',
    checkUserValidity,
    isEmailBusy,
    userController.createUser);

router.get('/:userId',
    userIsNotExist,
    userController.getUserById);

router.delete('/:userId',
    userIsNotExist,
    userController.deleteUser);

router.patch('/:userId',
    checkUserValidity,
    userIsNotExist,
    userController.updateUser);

module.exports = router;
