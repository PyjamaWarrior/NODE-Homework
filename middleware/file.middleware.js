const { constants, statusCodesEnum: { BAD_REQUEST } } = require('../constant');
const ErrorHandler = require('../error/ErrorHandler');
const { statusMessages } = require('../status-messages');

module.exports = {
    checkFile: (req, res, next) => {
        try {
            const { files } = req;

            const docs = [];
            const images = [];

            if (files) {
                const allFiles = Object.values(files);

                allFiles.forEach(file => {
                    const { mimetype, size } = file;

                    if (constants.DOCS_MIMETYPES.includes(mimetype)) {
                        if (constants.DOCS_MAX_SIZE < size) {
                            throw new ErrorHandler(BAD_REQUEST, statusMessages.FILE_SIZE_TOO_LARGE.customCode);
                        }

                        docs.push(file);
                    } else if (constants.IMG_MIMETYPES.includes(mimetype)) {
                        if (constants.IMG_MAX_SIZE < size) {
                            throw new ErrorHandler(BAD_REQUEST, statusMessages.FILE_SIZE_TOO_LARGE.customCode);
                        }

                        images.push(file);
                    } else {
                        throw new ErrorHandler(BAD_REQUEST, statusMessages.INVALID_FILE_TYPE.customCode);
                    }
                });

                req.docs = docs;
                req.images = images;
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAvatar: (req, res, next) => {
        try {
            if (req.images && req.images.length > 1) {
                throw new ErrorHandler(BAD_REQUEST, statusMessages.PHOTO_LIMIT.customCode);
            }

            [req.avatar] = req.images;

            next();
        } catch (e) {
            next(e);
        }
    }
};
