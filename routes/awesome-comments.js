const { list, show, create, update, destroy, star, unstar } = require('../app/controllers/AwesomeCommentController')

module.exports = (router) => {
  // get list
  router.get('/awesome-comments', list)
  // get specified resource
  router.get('/awesome-comments/:id', show)
  // create resource
  router.post('/awesome-comments', create)
  // update specified resource
  router.put('/awesome-comments/:id', update)
  // delete resource
  router.del('/awesome-comments/:id', destroy);
  // user star specified resource
  router.post('/awesome-comments/:id/star', star);
  // unStar specified resource
  router.post('/awesome-comments/:id/unstar', unstar)
}