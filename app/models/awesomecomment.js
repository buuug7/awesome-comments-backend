const simplePaginate = require('../pagination')

module.exports = (sequelize, DataTypes) => {
  const AwesomeComment = sequelize.define('AwesomeComment', {
    userId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    reference: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
  }, {
    paranoid: true,
  })
  AwesomeComment.associate = function (models) {
    // associations can be defined here
    // models.AwesomeComment.belongsTo(models.User)
    // models.AwesomeComment.belongsToMany(models.User,
    //   { as: 'starUsers', through: 'AwesomeCommentUserStars' })
  }

  AwesomeComment.simplePaginate = simplePaginate

  return AwesomeComment
}