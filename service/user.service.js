const { User } = require('../dataBase/models');

module.exports = {
    getUsers: filterObject => User.find(filterObject),

    getSingleUser: filterObject => User.findOne(filterObject),

    getUserById: userId => User.findById(userId),

    createUser: userObject => User.create(userObject),

    updateUser: (userId, updatedUserObject) => User.findByIdAndUpdate(userId, updatedUserObject),

    deleteUser: userId => User.findByIdAndRemove(userId)
};
