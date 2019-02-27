const { bookshelf } = require('../db')

const AwesomeComment = require('./AwesomeComment')

const User = bookshelf.Model.extend({
  tableName: 'users',

  awesomeComments: function () {
    return this.hasMany(AwesomeComment)
  }
})

module.exports = bookshelf.model('User', User)