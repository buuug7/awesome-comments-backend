const { bookshelf } = require('../DB')

const User = require('./User')

module.exports = bookshelf.Model.extend({
  tableName: 'awesome_comments',

  user: function () {
    return this.belongsTo(User)
  },
})