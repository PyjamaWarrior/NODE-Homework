const { Schema, model } = require('mongoose');

const { dataBaseCollectionsEnum: { CAR, USER } } = require('../../constant');

const userScheme = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, select: false, required: true },
    avatar: { type: String },
    _cars: [{ type: Schema.Types.ObjectId, ref: CAR }]
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

module.exports = model(USER, userScheme);
