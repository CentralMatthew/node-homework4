const { Users } = require('../dataBase');
const { statusCode, emailActionEnum: { REGISTRATION, UPDATE, DELETE } } = require('../constants');
const { UPDATED } = require('../constants/successResults');
const { passwordHasher, mailService } = require('../services');

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await Users.find({});
      res.status(statusCode.OK).json(users);
    } catch (e) {
      next(e);
    }
  },

  getUserById: (req, res, next) => {
    try {
      const { user } = req;

      res.json(user);
    } catch (e) {
      next(e);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const { password } = req.body;

      const hashedPassword = await passwordHasher.hash(password);
      const user = await Users.create({ ...req.body, password: hashedPassword });
      const { email, name } = user;

      await mailService.sendMail(email, REGISTRATION, { userName: name });

      res.status(statusCode.CREATED).json(user);
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { email, name } = req.user;

      await Users.findByIdAndRemove(userId);

      await mailService.sendMail(email, DELETE, { userName: name });

      res.status(statusCode.NO_CONTENT);
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { email, name } = req.user;

      await Users.findByIdAndUpdate(userId, req.body);

      await mailService.sendMail(email, UPDATE, { userName: name });

      res.status(statusCode.CREATED).json(UPDATED);
    } catch (e) {
      next(e);
    }
  }

};
