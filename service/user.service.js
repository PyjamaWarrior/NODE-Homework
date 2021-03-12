const { User } = require('../dataBase/models');
require('../dataBase/models/Car');

module.exports = {
    getUsers: filterObject => User.find(filterObject),

    getSingleUser: filterObject => User.findOne(filterObject),

    getUserById: userId => User.findById(userId),

    createUser: userObject => User.create(userObject),

    updateUser: (userId, updateObject) => User.findByIdAndUpdate(userId, { $set: updateObject }),

    deleteUser: userId => User.findByIdAndRemove(userId)
};
