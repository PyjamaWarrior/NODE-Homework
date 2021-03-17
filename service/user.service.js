const { User } = require('../dataBase/models');

module.exports = {
    getUsers: searchObject => User.findAll({ where: searchObject }),

    getSingleUser: searchObject => User.findOne({ where: searchObject }),

    getUserById: userId => User.findByPk(userId),

    createUser: userObject => User.create(userObject),

    updateUser: (userId, updatedFields) => User.update(updatedFields, { where: { id: userId } }),

    deleteUser: userId => User.destroy({ where: { id: userId } }),
};
