const fs = require('fs-extra');
const path = require('path');
const uuid = require('uuid').v1;

const {
    CARS,
    IMAGES,
    STATIC,
    USERS
} = require('../constant/foldersNames.enum');
const { fileService } = require('../service');

module.exports = {
    uploadUserAvatar: async (avatar, itemName, itemId) => {
        const pathWithoutStatic = path.join(USERS, `${itemId}`, IMAGES);
        const fileDir = path.join(process.cwd(), STATIC, pathWithoutStatic);
        const fileExtension = itemName.split('.').pop();
        const fileName = `${uuid()}.${fileExtension}`;
        const finalFilePath = path.join(fileDir, fileName);
        const uploadPath = path.join(pathWithoutStatic, fileName);

        await fs.mkdir(fileDir, { recursive: true });
        await avatar.mv(finalFilePath);

        return uploadPath;
    },

    carFileUploader: async (carId, files, folderType, itemType) => {
        const pathWithoutStatic = path.join(CARS, `${carId}`, folderType);
        const fileDir = path.join(process.cwd(), STATIC, pathWithoutStatic);

        await fs.mkdir(fileDir, { recursive: true });

        const promises = files.map(file => {
            const fileExtension = file.name.split('.').pop();
            const fileName = `${uuid()}.${fileExtension}`;
            const finalFilePath = path.join(fileDir, fileName);
            const uploadPath = path.join(pathWithoutStatic, fileName);

            file.mv(finalFilePath);

            return fileService.createCarFile({ file: uploadPath, type: itemType, _car_id: carId });
        });

        await Promise.allSettled(promises);
    },

    filesDeleter: async (id, folderType) => {
        const pathWithoutStatic = path.join(folderType, `${id}`);
        const fileDir = path.join(process.cwd(), STATIC, pathWithoutStatic);

        // await fs.rmdir(fileDir, { recursive: true }); // DON`T RABOTAET
        await fs.remove(fileDir);
    }
};
