const jsonWebToken = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const fetch = require('node-fetch')

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

async function github (ctx, next) {
  const clientId = 'e35c0fb524d888487038'
  const clientSecret = 'b5d2df1a91c6cca5a0ad73ffb6d565ce6096f221'
  const redirectUrl = 'http://localhost:3000/public/login/github/callback'
  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=user`

  await ctx.render('github', {
    url: url
  })
}

async function githubCallback (ctx, next) {

  let query = ctx.request.query
  let code = query.code

  const clientId = 'e35c0fb524d888487038'
  const clientSecret = 'b5d2df1a91c6cca5a0ad73ffb6d565ce6096f221'
  const redirectUrl = 'http://localhost:3000/public/login/github/callback'

  const url = 'https://github.com/login/oauth/access_token'


  try {
    let s = await fetch(url, {
      method: 'POST',
      body: {
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        redirect_uri: redirectUrl
      },
      mode:'no-cors'
    })
  }catch (e) {
    console.log(e)
  }

  ctx.body = s
}

module.exports = { login, github, githubCallback }