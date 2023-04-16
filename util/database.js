const Sequelize = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_SCHEMA_NAME,process.env.DB_ROOT_USER,process.env.DB_SCHEMA_PASS,{
    dialect: 'mysql',
    host: process.env.DB_54.145.244.191,
});
module.exports = sequelize;