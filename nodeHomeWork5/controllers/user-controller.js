const { Users } = require('../dataBase');
const { statusCode } = require('../constants');
const { UPDATED } = require('../constants/successResults');
const { passwordHasher } = require('../helpers');

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
            const createdUser = await Users.create({ ...req.body, password: hashedPassword });

            res.status(statusCode.CREATED).json(createdUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { userId } = req.params;

            await Users.findByIdAndRemove(userId);

            res.status(statusCode.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { userId } = req.params;

            await Users.findByIdAndUpdate(userId, req.body);

            res.status(statusCode.CREATED).json(UPDATED);
        } catch (e) {
            next(e);
        }
    }

};
