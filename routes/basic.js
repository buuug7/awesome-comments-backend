const jsonWebToken = require('jsonwebtoken')
const { knex, bookshelf } = require('../app/db')

const User = require('../app/models/user')

module.exports = (router) => {
  router.get('/public/login', (ctx, next) => {
    const user = {
      name:'buuug7',
      password:'secret'
    }

    ctx.body = {
      token:jsonWebToken.sign(user, process.env.APP_KEY)
    }
  })

  // getting the home route
  router.get('/public/test', async (ctx, next) => {

    ctx.body = await new User().fetchAll()

  })

}