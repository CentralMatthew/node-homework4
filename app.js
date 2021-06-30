const express = require('express');
const mongoose = require('mongoose');

const { userRouter } = require('./routes');
const { PORT } = require('./constants/port');
const { unknownErrors, statusCode } = require('./constants');

const app = express();

_moongoseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use(_handleErrors);
app.use('*', _notFoundHandler);

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});

// eslint-disable-next-line no-unused-vars
function _handleErrors(err, req, res, next) {
    res
        .status(err.status)
        .json({
            message: err.message || unknownErrors.UNKNOWN_ERROR,
            customCode: err.code || unknownErrors.UNKNOWN_STATUS
        });
}

function _notFoundHandler(err, req, res, next) {
    next({
        status: err.status || statusCode.NOT_FOUND,
        message: err.message || unknownErrors.ROUTE_NOT_FOUND
    });
}

function _moongoseConnector() {
    mongoose.connect('mongodb://localhost:27017/UsersNode', { useUnifiedTopology: true, useNewUrlParser: true });
}
