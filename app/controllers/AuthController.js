const jsonWebToken = require('jsonwebtoken')
const User = require('../models/User')
const AwesomeComment = require('../models/AwesomeComment')

// login
const login = (ctx, next) => {
  const user = ctx.request.body

  if (user.password === '123456') {
    return ctx.body = {
      token: jsonWebToken.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 10),
        user: {
          username: user.name,
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

const test = async (ctx, next) => {
 let t = await User.where({id:1}).fetch({
   withRelated:[{
     awesomeComments: function (q) {
       q.limit(2)
     }
   }]
 })

  ctx.body = t;
}

module.exports = { login, test }