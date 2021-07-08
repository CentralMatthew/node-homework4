const { statusCode } = require('../constants');
const { OAuth } = require('../dataBase');
const { headersConstant: { AUTHORIZATION } } = require('../constants');
const { ErrorHandler } = require('../errors');
const { authValidator } = require('../validators');
const { errorMessage: { NO_TOKEN, WRONG_TOKEN, INVALID_KEY_VALUE } } = require('../errors');
const { authService } = require('../services');
const { tokensConstant: { REFRESH } } = require('../constants');

module.exports = {
  checkLoginValidity: (req, res, next) => {
    try {
      const { error } = authValidator.logIn.validate(req.body);

      if (error) {
        throw new ErrorHandler(
            statusCode.BAD_REQUEST,
            error.details[0].message,
            INVALID_KEY_VALUE.code
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkAccessToken: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      if (!token) {
        throw new ErrorHandler(statusCode.UNAUTHORIZED, NO_TOKEN.message, NO_TOKEN.code);
      }

      await authService.verifyToken(token);

      const findedToken = await OAuth.findOne({ accessToken: token });

      if (!findedToken) {
        throw new ErrorHandler(statusCode.UNAUTHORIZED, WRONG_TOKEN.message, WRONG_TOKEN.code);
      }

      req.user = findedToken.user;

      next();
    } catch (e) {
      next(e);
    }
  },

  checkRefreshToken: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      if (!token) {
        throw new ErrorHandler(statusCode.UNAUTHORIZED, NO_TOKEN.message, NO_TOKEN.code);
      }

      await authService.verifyToken(token, REFRESH);

      const findedToken = await OAuth.findOne({ refreshToken: token });

      if (!findedToken) {
        throw new ErrorHandler(statusCode.UNAUTHORIZED, WRONG_TOKEN.message, WRONG_TOKEN.code);
      }

      req.user = findedToken.user;

      next();
    } catch (e) {
      next(e);
    }
  }
};
