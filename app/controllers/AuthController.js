const jsonWebToken = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { User } = require('../models/index')

// login
const login = async(ctx, next) => {
  const requestData = ctx.request.body

  let user = await User.findOne({
    where: { email: requestData.email },
    attributes: ['id', 'name', 'email', 'password'],
  })

  if (!user) {
    ctx.status = 401
    return ctx.body = {
      message: `Not exists a email with ${requestData.email}, did you already registry it?`,
    }
  }

  if (bcrypt.compareSync(requestData.password, user.password)) {
    return ctx.body = {
      token: jsonWebToken.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 10),
        name: user.name,
        email: user.email,
        id: user.id,
      }, process.env.APP_KEY),
    }
  } else {
    ctx.status = 401
    ctx.body = {
      message: 'Authentication Error',
    }
  }
}

module.exports = { login }