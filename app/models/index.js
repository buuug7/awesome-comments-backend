const sequelize = require('../db')

const models = {
  User: sequelize.import(__dirname + '/user'),
  AwesomeComment: sequelize.import(__dirname + '/awesomecomment'),
}

Object.keys(models).forEach(key => {
  models[key].associate(models)
})

models['sequelize'] = sequelize

module.exports = models
