module.exports = {
    // 200 SUCCESS
    RECORD_DELETED: {
        customCode: 2001
    },

    RECORD_UPDATED: {
        customCode: 2002
    },

    // 201 CREATED
    RECORD_CREATED: {
        customCode: 2011
    },

    // 400 BAD REQUEST
    BAD_REQUEST: {
        customCode: 4001
    },

    FILE_SIZE_TOO_LARGE: {
        customCode: 4002
    },

    INVALID_FILE_TYPE: {
        customCode: 4003
    },

    INVALID_MAIL_ACTION: {
        customCode: 4004
    },

    JOI_VALIDATION_FAILED: {
        customCode: 4005
    },

    NO_TOKEN: {
        customCode: 4006
    },

    PHOTO_LIMIT: {
        customCode: 4007
    },

    // WRONG_EMAIL_OF_PASSWORD: {
    //     customCode: 4005
    // },

    // 401 UNAUTHORIZED
    UNAUTHORIZED: {
        customCode: 4011
    },

    WRONG_EMAIL_OR_PASSWORD: {
        customCode: 4012
    },

    WRONG_TOKEN: {
        customCode: 4013
    },

    // 404 NOT FOUND
    RECORD_NOT_FOUND: {
        customCode: 4041
    },

    // 409 CONFLICT
    RECORD_ALREADY_EXISTS: {
        customCode: 4091
    },
};
