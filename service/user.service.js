const fse = require('fs-extra');
const path = require('path');

const errorMessages = require('../status-messages/error.messages');

const dbPath = path.join(process.cwd(), 'dataBase', 'users.json');

module.exports = {
    getUsers: async (query, prefLang) => {
        const data = await fse.readFile(dbPath);

        const users = JSON.parse(data.toString());
        const {username} = query;

        if (!username) {
            return users;
        }

        const find = users.find(user => user.username === username);

        if (!find) {
            throw new Error(errorMessages.CANT_FIND_USER[prefLang]);
        }

        return find;
    },
    // закоментовано, бо зробив аналог через query в методі вище
    // getUserByUsername: async (username, prefLang) => {
    //     const data = await fse.readFile(dbPath);
    //
    //     const users = JSON.parse(data.toString());
    //
    //     const find = users.find(user => user.username === username);
    //
    //     if (!find) {
    //         throw new Error(errorMessages.CANT_FIND_USER[prefLang]);
    //     }
    //
    //     return find;
    //
    // },
    createUser: async (user) => {
        const data = await fse.readFile(dbPath);

        const users = JSON.parse(data.toString());
        const {username, email, password, prefLang = 'en'} = user;

        const find = users.find(value => value.email === email);

        if (find) {
            throw new Error(errorMessages.USER_ALREADY_CREATED[prefLang]);
        }

        users.push({username, email, password});

        await fse.writeFile(dbPath, JSON.stringify(users));
    },
    deleteUser: async (userId, prefLang) => {
        const data = await fse.readFile(dbPath);

        const users = JSON.parse(data.toString());

        if (!users[userId]) {
            throw new Error(errorMessages.CANT_FIND_USER[prefLang]);
        }

        users.splice(userId, 1);

        await fse.writeFile(dbPath, JSON.stringify(users));
    }
}
