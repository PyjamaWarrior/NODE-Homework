const { emailActionsEnum } = require('../constant');

module.exports = {
    [emailActionsEnum.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome!'
    },

    [emailActionsEnum.DELETE_USER]: {
        templateName: 'user-deleted',
        subject: 'Your account was deleted!'
    }
};
