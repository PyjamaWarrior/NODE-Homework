const express = require('express');
const expressHBS = require('express-handlebars');
const fs = require('fs');
const path = require('path');
const app = express();
const usersPath = path.join(__dirname, 'users', 'users.json');

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// ========== HBS Config ===============================================================================================
app.set('view engine', '.hbs');
app.engine('.hbs', expressHBS({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));
// ======== / HBS Config ===============================================================================================

// ========== Registration =============================================================================================
app.get('/registration', (req, res) => {
    res.render('registration');
});

app.post('/registration', (req, res) => {
    fs.readFile(usersPath, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const {email} = req.body;
        const users = JSON.parse(data.toString());
        const find = users.find(user => user.email === email);

        if (!find) {
            users.push(req.body);

            fs.writeFile(usersPath, JSON.stringify(users), err1 => {
                if (err1) {
                    console.log(err1);
                }
            });

            res.redirect('/users');
            return;
        }

        res.redirect('/error');
    });
});
// ======== / Registration =============================================================================================

// ========== LogIn ====================================================================================================
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    fs.readFile(usersPath, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const {email, password} = req.body;
        const users = JSON.parse(data.toString());
        const find = users.findIndex(user => user.email === email && user.password === password);

        if (find === -1) {
            res.redirect('/registration');
            return;
        }

        res.redirect(`/users/${find}`);
    });
});
// ======== / LogIn ====================================================================================================

// ========== Data rendering ===========================================================================================
app.get('/users', (req, res) => {
    fs.readFile(usersPath, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const users = JSON.parse(data.toString());
        res.render('users', {users: users});
    })
});

app.get('/users/:userId', (req, res) => {
    const {userId} = req.params;

    fs.readFile(usersPath, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const users = JSON.parse(data.toString());
        res.render('user', {user: users[userId]});
    });
});

app.get('/error', (req, res) => {
    res.render('error');
});
// ======== / Data rendering ===========================================================================================

app.listen(5000, () => {
    console.log('Listen port 5000');
});
