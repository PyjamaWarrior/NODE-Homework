const { User } = require('../dataBase/models');

module.exports = {
    getUsers: filterObject => User.find(filterObject),

    getSingleUser: filterObject => User.findOne(filterObject),

    getUserById: userId => User.findById(userId),

    createUser: userObject => User.create(userObject),

    updateUser: (userId, updatedUserObject) => User.findByIdAndUpdate(userId, updatedUserObject),
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

    deleteUser: userId => User.findByIdAndRemove(userId)
    // Ще один варіант
    // const res = await User.deleteOne({ _id: userId });
    //
    // if (!res.deletedCount) {
    //     throw new Error(statusMessages.CANT_FIND_USER);
    // }
};
