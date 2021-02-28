const User = require('../dataBase/models/User');
const statusMessages = require('../status-messages/stastus.messages');

module.exports = {
    getUsers: async filterObject => {
        const users = await User.find(filterObject);

        if (!users.length) {
            throw new Error(statusMessages.CANT_FIND_USER);
        }

        return users;
    },

    getUserById: async userId => {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error(statusMessages.CANT_FIND_USER);
        }

        return user;
    },

    createUser: async userObject => {
        const { email } = userObject;

        const users = await User.find({ email });

        if (users.length) {
            throw new Error(statusMessages.USER_ALREADY_CREATED);
        }

        await User.create(userObject);
    },

    updateUser: async (userId, updatedUserObject) => {
        const updatedUser = await User.findByIdAndUpdate(userId, updatedUserObject);

        if (!updatedUser) {
            throw new Error(statusMessages.CANT_FIND_USER);
        }

        // Ще один варіант
        // const res = await User.updateOne({ _id: userId }, updatedUserObject);
        //
        // if (!res.n) {
        //     throw new Error(statusMessages.CANT_FIND_USER);
        // }
        //
        // if (!res.nModified) {
        //     throw new Error(statusMessages.CANT_UPDATE_USER);
        // }
    },

    deleteUser: async userId => {
        const deletedUser = await User.findByIdAndRemove(userId);

        if (!deletedUser) {
            throw new Error(statusMessages.CANT_FIND_USER);
        }

        // Ще один варіант
        // const res = await User.deleteOne({ _id: userId });
        //
        // if (!res.deletedCount) {
        //     throw new Error(statusMessages.CANT_FIND_USER);
        // }
    }
};
