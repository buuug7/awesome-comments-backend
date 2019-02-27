const { bookshelf } = require('../db')

const User = require('./User')

const AwesomeComment = bookshelf.Model.extend({
  tableName: 'awesome_comments',

  user: function () {
    return this.belongsTo('User')
  },

  // hidden: ['deleted_at']

})

module.exports = bookshelf.model('AwesomeComment', AwesomeComment)