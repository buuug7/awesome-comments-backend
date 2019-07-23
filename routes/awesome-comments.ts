// @ts-ignore
const {
  list,
  show,
  create,
  update,
  destroy,
  star,
  unStar,
  starCount
} = require('../app/controllers/AwesomeCommentController');

module.exports = router => {
  // Get a listing of the resource
  router.get('/awesome-comments', list);
  // Get the specified resource
  router.get('/awesome-comments/:id', show);
  // Store a newly created resource in storage
  router.post('/awesome-comments', create);
  // Update the specified resource in storage
  router.put('/awesome-comments/:id', update);
  // Remove the specified resource from storage
  router.del('/awesome-comments/:id', destroy);
  // Star the specified resource
  router.post('/awesome-comments/:id/star', star);
  // unStar the specified resource
  router.post('/awesome-comments/:id/unstar', unStar);
  // Get the star count of specified resource
  router.get('/awesome-comments/:id/starcount', starCount);
};
