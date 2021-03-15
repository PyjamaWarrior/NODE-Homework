module.exports = (query = {}) => {
    const {
        limit = 3,
        orderBy = 'asc',
        page = 1,
        sortBy = 'createdAt',
        ...filters
    } = query;

    const keys = Object.keys(filters);
    const order = orderBy === 'asc' ? 1 : -1;
    const skip = (page - 1) * limit;
    const sort = { [sortBy]: order };

    return {
        filters,
        keys,
        limit,
        page,
        skip,
        sort
    };
};
