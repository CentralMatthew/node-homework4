const { OAuth } = require('../dataBase');
const { passwordHasher, authService, mailService } = require('../services');
const {
  statusCode, successResult, headersConstant: { AUTHORIZATION }, emailActionEnum: { WELCOME }
} = require('../constants');

module.exports = {
  login: async (req, res, next) => {
    try {
      const {
        password: hashedPassword, _id, email, name
      } = req.user;
      const { password } = req.body;

      await passwordHasher.compare(hashedPassword, password);

      await mailService.sendMail(email, WELCOME, { userName: name });

      const tokenPair = authService.generateTokenPair();

      await OAuth.create({
        accessToken: tokenPair.accessToken,
        refreshToken: tokenPair.refreshToken,
        user: _id
      });

      res.json({
        ...tokenPair,
        user: req.user
      });
    } catch (e) {
      next(e);
    }
  },

  logout: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      await OAuth.remove({ accessToken: token });

      res.status(statusCode.NO_CONTENT).json(successResult.SUCCESS_LOG_OUT);
    } catch (e) {
      next(e);
    }
  },

  refresh: async (req, res, next) => {
    try {
      const refreshToken = req.get(AUTHORIZATION);

      const tokenPair = authService.generateTokenPair();

      await OAuth.findOneAndUpdate({ refreshToken }, { ...tokenPair });
      console.log(tokenPair);

      /*  await OAuth.create({
        access_token: tokenPair.accessToken,
        refresh_token: tokenPair.refreshToken,
        user: _id
      });
*/
      res.json({
        ...tokenPair,
        user: req.user
      });

      res.status(statusCode.OK).json(successResult.SUCCESS_REFRESH);
    } catch (e) {
      next(e);
    }
  },
};
