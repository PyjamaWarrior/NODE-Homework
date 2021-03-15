const { User } = require('../dataBase/models');
const queryBuildHelper = require('../helper/queryBuild.helper');

module.exports = {
    getUsers: async query => {
        const {
            filters,
            keys,
            limit,
            page,
            skip,
            sort
        } = queryBuildHelper(query);
        const filterObject = {};

        keys.forEach(key => {
            switch (key) {
                case 'ageGte': {
                    filterObject.age = Object.assign({}, filterObject.age, { $gte: +filters.ageGte });
                    break;
                }
                case 'ageLte': {
                    filterObject.age = Object.assign({}, filterObject.age, { $lte: +filters.ageLte });
                    break;
                }
                case 'email': {
                    filterObject.email = { $regex: filters.email, $options: 'i' };
                    break;
                }
                case 'firstName': {
                    filterObject.firstName = { $regex: filters.firstName, $options: 'i' };
                    break;
                }
                case 'lastName': {
                    filterObject.lastName = { $regex: filters.lastName, $options: 'i' };
                    break;
                }
                default: {
                    filterObject[key] = filters[key];
                }
            }
        });

        const users = await User
            .find(filterObject)
            .limit(+limit)
            .skip(skip)
            .sort(sort)
            .populate('_cars');
        const count = await User.countDocuments(filterObject);

        return {
            data: users,
            count,
            limit: +limit,
            page: +page,
            pages: Math.ceil(count / limit)
        };
    },

    getSingleUser: filterObject => User.findOne(filterObject),

    getUserById: userId => User.findById(userId),

    createUser: userObject => User.create(userObject),

    updateUser: (userId, updateObject) => User.findByIdAndUpdate(userId, { $set: updateObject }),

    deleteUser: userId => User.findByIdAndRemove(userId)
};
