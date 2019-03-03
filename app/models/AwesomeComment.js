const simplePaginate = require('../pagination')
const { AwesomeCommentUserStar } = require('./index')

module.exports = (sequelize, DataTypes) => {
  const AwesomeComment = sequelize.define('AwesomeComment',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      UserId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      reference: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,

      // virtual fields
      // author: {
      //   type: DataTypes.VIRTUAL,
      //   get: async function () {
      //     return 'buuug7'
      //   }
      // }
    },
    {
      paranoid: true,
    }
  )
  AwesomeComment.associate = function (models) {
    models.AwesomeComment.belongsTo(models.User)
    models.AwesomeComment.belongsToMany(models.User,
      {
        as: { singular: 'StarUser', plural: 'StarUsers' },
        through: models.AwesomeCommentUserStar
      })
  }

  AwesomeComment.simplePaginate = simplePaginate

  /**
   * Detect the resource is owned by a give user
   * @param {number} userId
   * @return {Promise<boolean>}
   */
  AwesomeComment.prototype.hasOwnedByGiveUser = async function (userId) {
    return userId && this.UserId === userId
  }

  return AwesomeComment
}