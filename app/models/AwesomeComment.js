const { bookshelf } = require('../db')

const User = require('./User')

const AwesomeComment = bookshelf.Model.extend({
  tableName: 'awesome_comments',

  // hidden: ['deleted_at']

  virtuals: {
    fullName: function () {
      return 'buuug7'
    }
  },

  user () {
    return this.belongsTo('User')
  },

  starUsers () {
    return this.belongsToMany('User', 'awesome_comment_user_stars')
  },

  // initialize() {
  //   this.constructor.__super__.initialize.apply(this, arguments);
  //   // Your initialization code ...
  // },

  // serialize () {
  //   return Object.assign({}, this.attributes, {
  //     someCustomAttribute: 1232
  //   })
  // },

  /**
   * detect the resource is star by given user
   * @param {number} user_id
   * @return {boolean}
   */
  async hasStarByGivenUser (user_id) {

    let users = await this.starUsers().query({
      where: { user_id: user_id },
    }).fetch()

    return users.length > 0
  },

  /**
   * get the count of star users
   * @return {number}
   */
  async starUsersCount () {
    const count = await bookshelf.knex('awesome_comment_user_stars').where({
      awesome_comment_id: this.id,
    }).count('* as c')

    return count[0].c
  },

})

module.exports = bookshelf.model('AwesomeComment', AwesomeComment)