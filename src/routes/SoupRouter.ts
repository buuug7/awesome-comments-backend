import {
  list,
  show,
  create,
  update,
  destroy,
  star,
  unStar,
  starCount,
  createComment,
  getComments
} from '../controllers/SoupController';

export default router => {
  router.get('/public/soups', list);

  router.get('/public/soups/:id', show);

  router.post('/soups', create);

  router.put('/soups/:id', update);

  router.del('/soups/:id', destroy);

  router.post('/soups/:id/star', star);

  router.post('/soups/:id/unStar', unStar);

  router.get('/soups/:id/starCount', starCount);

  router.post('/soups/:id/comment', createComment);

  router.get('/soups/:id/comments', getComments);
};
