import { show, reply } from '../controllers/CommentController';

export default router => {
  router.get('/comments/:id', show);
  router.post('/comments/:id/reply', reply);
};
