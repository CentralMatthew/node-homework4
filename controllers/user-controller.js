const { Users } = require('../dataBase');
const { statusCode } = require('../constants');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await Users.find({});

            res.status(statusCode.OK).json(users);
        } catch (err) {
            next(err);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const { user } = req;

            res.json(user);
        } catch (err) {
            next(err);
        }
    },

    createUser: async (req, res, next) => {
        try {
            await Users.create(req.body);

            res.status(statusCode.CREATED).json('success');
        } catch (err) {
            next(err);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { userId } = req.params;

            await Users.findByIdAndRemove(userId);

            res.status(statusCode.NO_CONTENT).json('success deleted');
        } catch (err) {
            next(err);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { userId } = req.params;

            await Users.findByIdAndUpdate(userId, req.body);

            res.status(statusCode.CREATED).json('success updated!');
        } catch (err) {
            next(err);
        }
    }

};
