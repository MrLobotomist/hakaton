// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('hakaton', 'hakaton_user', 'hakaton', {
    host: '92.53.119.132',
    dialect: 'postgres',
    port: 5432,
    logging: false,
});

module.exports = sequelize;
