const { Car } = require('../dataBase/models');
const queryBuildHelper = require('../helper/queryBuild.helper');

module.exports = {
    getCars: async query => {
        const {
            filters,
            keys,
            limit,
            page,
            skip,
            sort
        } = queryBuildHelper(query);
        const filterObject = {};

        keys.forEach(key => {
            switch (key) {
                case 'color': {
                    const colors = filters.color.split(';');
                    filterObject.color = { $in: colors };
                    break;
                }
                case 'manufacturer': {
                    filterObject.manufacturer = { $regex: filters.manufacturer, $options: 'i' };
                    break;
                }
                case 'model': {
                    filterObject.model = { $regex: filters.model, $options: 'i' };
                    break;
                }
                case 'priceGte': {
                    filterObject.price = Object.assign({}, filterObject.price, { $gte: +filters.priceGte });
                    break;
                }
                case 'priceLte': {
                    filterObject.price = Object.assign({}, filterObject.price, { $lte: +filters.priceLte });
                    break;
                }
                default: {
                    filterObject[key] = filters[key];
                }
            }
        });

        const cars = await Car.find(filterObject).limit(+limit).skip(skip).sort(sort);
        const count = await Car.countDocuments(filterObject);

        return {
            data: cars,
            count,
            limit: +limit,
            page: +page,
            pages: Math.ceil(count / limit)
        };
    },

    getSingleCar: filterObject => Car.findOne(filterObject),

    getCarById: carId => Car.findById(carId),

    createCar: carObject => Car.create(carObject),

    updateCar: (carId, updateObject) => Car.findByIdAndUpdate(carId, { $set: updateObject }),

    deleteCar: carId => Car.findByIdAndRemove(carId)
};
