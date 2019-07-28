import {
  list,
  show,
  create,
  update,
  destroy,
  star,
  unStar,
  starCount
} from '../controllers/SoupController';

export default router => {
  // Get a listing of the resource
  router.get('/soups', list);
  // Get the specified resource
  router.get('/soups/:id', show);
  // // Store a newly created resource in storage
  router.post('/soups', create);
  // // Update the specified resource in storage
  router.put('/soups/:id', update);
  // // Remove the specified resource from storage
  router.del('/soups/:id', destroy);
  // // Star the specified resource
  router.post('/soups/:id/star', star);
  // // unStar the specified resource
  router.post('/soups/:id/unStar', unStar);
  // // Get the star count of specified resource
  router.get('/soups/:id/starCount', starCount);
};
