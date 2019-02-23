// database

const knex = require('knex');
const config = require('../config/database');

module.exports = knex(config[process.env.APP_ENV]);