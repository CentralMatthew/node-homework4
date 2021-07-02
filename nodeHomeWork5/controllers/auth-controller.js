const { statusCode } = require('../constants');

module.exports = {
    getUserInfo: (req, res, next) => {
        try {
            const { user } = req;

            res.status(statusCode.OK).json(user);
        } catch (e) {
            next(e);
        }
    }
};
