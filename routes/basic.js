const {login, test} = require('../app/controllers/BasicController')

module.exports = (router) => {
  router.get('/public/login',login )
  router.get('/public/test', test)
}