export const getDbURL = () => {
    require('dotenv').config();
    return `postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_DATABASE}?schema=public`
};
