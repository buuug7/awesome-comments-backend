import { starComments, starSoups, test } from '../controllers/UserController';

export default router => {
  router.get('/users/:id/starSoups', starSoups);

  router.get('/users/:id/starComments', starComments);

  router.get('/test', test);
};
