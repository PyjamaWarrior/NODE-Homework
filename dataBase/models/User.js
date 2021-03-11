const { Schema, model } = require('mongoose');

const { dataBaseCollectionsEnum: { USER } } = require('../../constant');

const userScheme = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, select: false, required: true }
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

userScheme.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

module.exports = model(USER, userScheme);
