const { Schema, model } = require('mongoose');

const { dataBaseCollectionsEnum: { CAR, USER } } = require('../../constant');

const userScheme = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    _cars: [{ type: Schema.Types.ObjectId }]
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

userScheme.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

userScheme.virtual('cars', {
    ref: CAR,
    localField: '_cars',
    foreignField: '_id'
});

userScheme
    .pre('find', function() {
        this.populate('cars');
    })
    .pre('findOne', function() {
        this.populate('cars');
    });

module.exports = model(USER, userScheme);
