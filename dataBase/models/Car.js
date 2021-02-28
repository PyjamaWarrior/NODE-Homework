const { Schema, model } = require('mongoose');

const carScheme = new Schema({
    manufacturer: { type: String, required: true },
    model: { type: String, required: true },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

module.exports = model('Car', carScheme);
