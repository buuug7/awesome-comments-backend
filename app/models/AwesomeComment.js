const { bookshelf } = require('../db')

const User = require('./User')

const AwesomeComment = bookshelf.Model.extend({
  tableName: 'awesome_comments',

  // hidden: ['deleted_at']

  user: function () {
    return this.belongsTo('User')
  },

  starUsers: function () {
    return this.belongsToMany('User', 'awesome_comment_user_stars')
  },

  /**
   * detect the resource is star by given user
   * @param {number} user_id
   * @return {boolean}
   */
  hasStarByGivenUser: async function (user_id) {

    let users = await this.starUsers().query({
      where: { user_id: user_id }
    }).fetch()

    return users.length > 0
  }



})

module.exports = bookshelf.model('AwesomeComment', AwesomeComment)