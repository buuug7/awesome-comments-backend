const { bookshelf } = require('../DB')

module.exports = bookshelf.Model.extend({
  tableName: 'users'
})