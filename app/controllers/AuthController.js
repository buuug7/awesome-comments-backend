const jsonWebToken = require('jsonwebtoken')
const User = require('../models/User')
const AwesomeComment = require('../models/AwesomeComment')
const bcrypt = require('bcrypt')

// login
const login = async(ctx, next) => {
  const requestData = ctx.request.body

  let user = await User.where({ email: requestData.email }).fetch()

  if (!user) {
    ctx.status = 401
    return ctx.body = {
      message: `Not exists a email with ${requestData.email}, did you already registry it?`
    }
  }

  if (bcrypt.compareSync(requestData.password, user.get('password'))) {
    return ctx.body = {
      token: jsonWebToken.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 10),
        user: {
          name: user.get('name'),
          email: user.get('email'),
          id: user.get('id')
        },
      }, process.env.APP_KEY),
    }
  } else {
    ctx.status = 401
    ctx.body = {
      message: 'Authentication Error',
    }
  }
}

const test = async(ctx, next) => {
  let t = await User.where({ id: 1 }).fetch({
    withRelated: [{
      awesomeComments: function (q) {
        q.limit(2)
      }
    }]
  })

  ctx.body = t
}

module.exports = { login, test }