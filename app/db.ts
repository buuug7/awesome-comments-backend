const Sequelize = require('sequelize');
const config = require('../config/database');

// @ts-ignore
module.exports = new Sequelize(config[process.env.APP_ENV]);
