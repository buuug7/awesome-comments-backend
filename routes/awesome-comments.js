const { list, show, create, update, destroy, star } = require('../app/controllers/AwesomeCommentController')

module.exports = (router) => {
  // get list
  router.get('/awesome-comments', list)
  // get specified one
  router.get('/awesome-comments/:id', show)
  // create one
  router.post('/awesome-comments', create)
  // update specified one
  router.put('/awesome-comments/:id', update)
  // delete one
  router.del('/awesome-comments/:id', destroy);
  // user star specified one
  router.post('/awesome-comments/:id/star', star);
}