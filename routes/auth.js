const { login, github, githubCallback } = require('../app/controllers/AuthController')

module.exports = (router) => {
  router.post('/public/login', login)
  router.get('/public/login/github', github)
  router.get('/public/login/github/callback', githubCallback)
}