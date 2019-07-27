
import Route from '@koa/router';

import { starSoups, test } from '../controllers/UserController'

export default router => {

  router.get('/users/:id/starSoups', starSoups);
  router.get('/test', test);
}
