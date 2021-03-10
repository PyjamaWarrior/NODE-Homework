module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'SECRET',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'REFRESH_SECRET',
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/homework-7',
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'nichinichisou0607@mokomo.ne.jp',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || '2dwad@mSdw',
    PORT: 5000,
};
