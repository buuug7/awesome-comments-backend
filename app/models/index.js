const sequelize = require("../db");

const models = {
  User: sequelize.import(__dirname + "/User"),
  AwesomeComment: sequelize.import(__dirname + "/AwesomeComment"),
  AwesomeCommentUserStar: sequelize.import(
    __dirname + "/AwesomeCommentUserStar"
  )
};

Object.keys(models).forEach(key => {
  models[key].associate(models);
});

models["sequelize"] = sequelize;

module.exports = models;
