const {login, test} = require('../app/controllers/AuthController')

module.exports = (router) => {
  router.post('/public/login',login )
  router.get('/test', test)
}