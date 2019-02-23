const {login, test} = require('../app/controller/BasicController')

module.exports = (router) => {
  router.get('/public/login',login )
  router.get('/public/test', test)
}