const express = require('express');
const mongoose = require('mongoose');

const apiRouter = require('./router/api.router');

const app = express();

_connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

app.listen(5000, () => {
    console.log('Listen port 5000');
});

function _connectDB() {
    mongoose.connect('mongodb://localhost:27017/homework-4', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    const { connection } = mongoose;

    connection.on('error', error => {
        console.log(error);
    });
}
