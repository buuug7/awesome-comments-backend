const sequelize = require('../db')

const models = {
  User: sequelize.import(__dirname + '/user'),
  AwesomeComment: sequelize.import(__dirname + '/awesomecomment'),
}

Object.keys(models).forEach(key => {
  models[key].associate(models)
})

// models.User.findOne({
//   where: { id: 1 },
//   include: [{
//     model:'starAwesomeComments'
//   }]
// }).then(res => console.log(JSON.stringify(res)))

// models.User.sync()
models.AwesomeComment.sync()

return
models['sequelize'] = sequelize

module.exports = models
