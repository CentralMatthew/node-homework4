const router = require('express').Router();

const { userController } = require('../controllers');
const { validValues, isEmailBusy, userIsNotExist } = require('../middlewares/user-middleware');

router.get('/', userController.getAllUsers);

router.post('/', validValues, isEmailBusy, userController.createUser);

router.get('/:userId', userIsNotExist, userController.getUserById);

router.delete('/:userId', userIsNotExist, userController.deleteUser);

router.patch('/:userId', userIsNotExist, userController.updateUser);

module.exports = router;
