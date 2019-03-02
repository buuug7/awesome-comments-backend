'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostStar = sequelize.define('PostStar', {
    firt_name: DataTypes.STRING
  }, {});
  PostStar.associate = function(models) {
    // associations can be defined here
  };
  return PostStar;
};