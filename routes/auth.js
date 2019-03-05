const { auth, github, githubCallback } = require('../app/controllers/AuthController')

module.exports = (router) => {
  router.post('/public/auth', auth)
  router.get('/public/login/github', github)
  router.get('/public/login/github/callback', githubCallback)
}