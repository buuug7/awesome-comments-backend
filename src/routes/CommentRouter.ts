import {
  show,
  reply,
  star,
  starCount,
  unStar, starUsers
} from '../controllers/CommentController';

export default router => {
  router.get('/comments/:id', show);

  router.post('/comments/:id/reply', reply);

  router.post('/comments/:id/star', star);

  router.post('/comments/:id/unStar', unStar);

  router.get('/comments/:id/starCount', starCount);

  router.get('/comments/:id/starUsers', starUsers);
};
