module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      github: DataTypes.STRING,
      password: DataTypes.STRING,
      rememberToken: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );
  User.associate = function(models) {
    models.User.hasMany(models.AwesomeComment);
    models.User.belongsToMany(models.AwesomeComment, {
      as: 'StarAwesomeComment',
      through: models.AwesomeCommentUserStar
    });
  };
  return User;
};
