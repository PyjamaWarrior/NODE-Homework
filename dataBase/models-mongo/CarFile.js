const { Schema, model } = require('mongoose');

const { dataBaseCollectionsEnum: { CAR } } = require('../../constant');

const carFileScheme = new Schema({
    file: { type: String },
    type: { type: String },
    _car_id: { type: Schema.Types.ObjectId, ref: CAR }
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

module.exports = model('CarFile', carFileScheme);
