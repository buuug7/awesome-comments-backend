'use strict';
module.exports = (sequelize, DataTypes) => {
  const AwesomeComment = sequelize.define('AwesomeComment', {
    userId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    reference: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {});
  AwesomeComment.associate = function(models) {
    // associations can be defined here
    models.AwesomeComment.belongsTo(models.User)
    // models.
  };
  return AwesomeComment;
};