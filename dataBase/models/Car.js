const { Schema, model } = require('mongoose');

const carScheme = new Schema({
    color: { type: String, required: true },
    manufacturer: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true }
}, {
    timestamps: true
});

module.exports = model('Car', carScheme);
