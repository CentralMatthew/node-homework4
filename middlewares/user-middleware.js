const { Users } = require('../dataBase');
const { ErrorHandler } = require('../errors');
const { USER_NOT_FOUND, EMAIL_IS_NOT_AVAILABLE, INVALID_KEY_VALUE } = require('../errors/error-message');
const { statusCode } = require('../constants');

module.exports = {
    userIsNotExist: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const userById = await Users.findById(userId);

            if (!userById) {
                throw new ErrorHandler(statusCode.NOT_FOUND, USER_NOT_FOUND.message, USER_NOT_FOUND.code);
            }

            req.user = userById;

            next();
        } catch (err) {
            next(err);
        }
    },

    validValues: (req, res, next) => {
        try {
            const {
                name, age, student, email, password
            } = req.body;

            if (typeof name !== 'string' || typeof age !== 'number' || typeof student !== 'boolean'
                || typeof email !== 'string' || typeof password !== 'string') {
                throw new ErrorHandler(statusCode.BAD_REQUEST, INVALID_KEY_VALUE.message, INVALID_KEY_VALUE.code);
            }

            next();
        } catch (err) {
            next(err);
        }
    },

    isEmailBusy: async (req, res, next) => {
        try {
            const { email } = req.body;
            const [user] = await Users.find({ email });

            if (user) {
                throw new ErrorHandler(statusCode.CONFLICT, EMAIL_IS_NOT_AVAILABLE.message, EMAIL_IS_NOT_AVAILABLE.code);
            }

            next();
        } catch (err) {
            next(err);
        }
    }

};
