module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    remember_token: DataTypes.STRING,
  }, {})
  User.associate = function (models) {
    // associations can be defined here
    models.User.hasMany(models.AwesomeComment)
    models.User.belongsToMany(models.AwesomeComment,
      { as: 'starAwesomeComments', through: 'AwesomeCommentUserStars' })
  }
  return User
}