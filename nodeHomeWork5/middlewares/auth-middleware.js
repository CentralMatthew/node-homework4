const { statusCode } = require('../constants');
const { Users } = require('../dataBase');
const { ErrorHandler } = require('../errors');
const { headersConstants: { AUTHORIZATION } } = require('../constants');
const { INVALID_KEY_VALUE, WRONG_EMAIL_OR_PASSWORD } = require('../errors/error-message');
const { authValidator } = require('../validators');

module.exports = {
    checkExistingLoginPassword: async (req, res, next) => {
        try {
            const { email } = req.body;
            const user = await Users.findOne({email}).select('+password');

            if (!user) {
                throw new ErrorHandler(
                    statusCode.FORBIDDEN,
                    WRONG_EMAIL_OR_PASSWORD.message,
                    WRONG_EMAIL_OR_PASSWORD.code
                );
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkLoginValidation: (req, res, next) => {
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
    }
};
