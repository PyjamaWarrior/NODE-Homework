const express = require('express');

const apiRouter = require('./router/api.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', apiRouter);

app.listen(5000, () => {
    console.log('Listen port 5000');
});
