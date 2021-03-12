const { emailActionsEnum, foldersNamesEnum: { USERS }, statusCodesEnum } = require('../constant');
const { fileHelper, passwordHasher } = require('../helper');
const { mailService, userService } = require('../service');
const { statusMessages } = require('../status-messages');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await userService.getUsers(req.query).populate('_cars');

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const { user } = req;

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { avatar, body, body: { email, firstName, password } } = req;

            const hasPassword = await passwordHasher.hash(password);
            const user = await userService.createUser({ ...body, password: hasPassword });

            if (avatar) {
                const uploadPath = await fileHelper.uploadUserAvatar(avatar, avatar.name, user._id);

                await userService.updateUser(user._id, { avatar: uploadPath });
            }

            await mailService.sendMail(email, emailActionsEnum.WELCOME, { userName: firstName });

            res.status(statusCodesEnum.CREATED).json({ code: statusMessages.RECORD_CREATED.customCode });
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {
                avatar,
                body,
                params: { userId },
                user: { avatar: existingAvatarPath }
            } = req;

            if (avatar) {
                const updatedAvatar = await fileHelper.updateUserAvatar(avatar, existingAvatarPath, avatar.name, userId);
                await userService.updateUser(userId, { ...body, avatar: updatedAvatar });
            } else {
                await userService.updateUser(userId, body);
            }

            res.json({ code: statusMessages.RECORD_UPDATED.customCode });
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const deletedUser = await userService.deleteUser(userId);

            const { email, _id, firstName } = deletedUser;

            await fileHelper.filesDeleter(_id, USERS);
            await mailService.sendMail(email, emailActionsEnum.DELETE_USER, { userName: firstName });

            res.json({ code: statusMessages.RECORD_DELETED.customCode });
        } catch (e) {
            next(e);
        }
    }
};
