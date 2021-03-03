const { Schema, model } = require('mongoose');

const { dataBaseCollectionsEnum: { CAR } } = require('../../constant');

const carScheme = new Schema({
    manufacturer: { type: String, required: true },
    model: { type: String, required: true },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

module.exports = model(CAR, carScheme);
