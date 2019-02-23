const jsonWebToken = require('jsonwebtoken')
const User = require('../models/User')

// login
const login = (ctx, next) => {
  const user = {
    name:'buuug7',
    password:'secret'
  }

  ctx.body = {
    token:jsonWebToken.sign(user, process.env.APP_KEY)
  }
}

const test = async (ctx, next) => {
  ctx.body = await new User().fetchAll()
}

module.exports = { login, test }