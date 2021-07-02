const { Schema, model } = require('mongoose');
const { dataBaseTableEnum } = require('../constants');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 10
    },
    age: {
        type: Number,
        default: 18
    },
    student: {
        type: Boolean
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

});

module.exports = model(dataBaseTableEnum.USERS, userSchema);
