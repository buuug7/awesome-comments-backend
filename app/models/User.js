const { bookshelf } = require('../DB')

const AwesomeComment = require('./AwesomeComment')

module.exports = bookshelf.Model.extend({
  tableName: 'users',

  awesomeComments: function () {
    return this.hasMany(AwesomeComment)
  }
})