const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

dotenv.config();

const { MONGO_URL, PORT } = require('./config/config');
const apiRouter = require('./router/api.router');

const app = express();

_connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    const { customCode, message, status } = err;

    res
        .status(status || 500)
        .json({
            code: customCode || 0,
            message
        });
});

app.listen(PORT, () => {
    console.log(`Listen port ${PORT}`);
});

function _connectDB() {
    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    const { connection } = mongoose;

    connection.on('error', error => {
        console.log(error);
    });
}
