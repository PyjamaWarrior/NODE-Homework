const dotenv = require('dotenv');
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

dotenv.config();

const { PORT } = require('./config/config');
const { STATIC } = require('./constant/foldersNames.enum');
const { sequelize } = require('./dataBase');
const apiRouter = require('./router/api.router');

const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), STATIC)));

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

(async () => {
    await sequelize.sync();
    app.listen(PORT, () => {
        console.log(`Listen port ${PORT}`);
    });
})();
