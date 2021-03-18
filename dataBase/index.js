// const fs = require('fs');
// const path = require('path');
// const { Sequelize } = require('sequelize');
//
// module.exports = (() => {
//     let instance;
//
//     const initConnection = () => {
//         const client = new Sequelize('homework-10', 'user', 'user', { dialect: 'mysql' });
//         const models = {};
//         const modelsPath = path.join(process.cwd(), 'dataBase', 'models');
//
//         const getModels = () => {
//             fs.readdir(modelsPath, (err, files) => {
//                 files.forEach(file => {
//                     const [model] = file.split('.');
//                     // eslint-disable-next-line import/no-dynamic-require
//                     const modelFile = require(path.join(modelsPath, model));
//
//                     models[model] = modelFile(client);
//                 });
//             });
//         };
//
//         return {
//             setModels: () => getModels(),
//             getModel: modelName => models[modelName]
//         };
//     };
//
//     return {
//         getInstance: () => {
//             if (!instance) {
//                 instance = initConnection();
//             }
//
//             return instance;
//         }
//     };
// })();

const { Sequelize } = require('sequelize');

const { DATA_BASE_NAME, DATA_BASE_PASSWORD, DATA_BASE_USER } = require('../config/config');
const { DIALECT, HOST } = require('../constant/constants');

module.exports.sequelize = new Sequelize(DATA_BASE_NAME, DATA_BASE_USER, DATA_BASE_PASSWORD, {
    host: HOST, // 'localhost'
    dialect: DIALECT, // 'mysql'
    logging: false
});
