const { bookshelf } = require('../db')

const AwesomeComment = require('./AwesomeComment')

const User = bookshelf.Model.extend({
  tableName: 'users',

  awesomeComments: function () {
    return this.hasMany('AwesomeComment')
  },

  starAwesomeComments: function () {
    return this.belongsToMany('AwesomeComment','awesome_comment_user_stars')
  }
})

module.exports = bookshelf.model('User', User)