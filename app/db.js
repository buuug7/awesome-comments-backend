// database

const knex = require('knex')
const bookshelf = require('bookshelf')
const config = require('../config/database')

const knexInstance = knex(config[process.env.APP_ENV]);

module.exports = {
  knex:knexInstance,
  bookshelf:bookshelf(knexInstance)
}