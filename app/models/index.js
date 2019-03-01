const sequelize = require('../db')

const models = {
  User: sequelize.import(__dirname + '/user'),
  AwesomeComment: sequelize.import(__dirname + '/awesomecomment'),
}

Object.keys(models).forEach(key => {
  models[key].associate(models)
})

module.exports = models
