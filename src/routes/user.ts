
import Route from '@koa/router';

import { starSoups } from '../controllers/UserController'

export default router => {

  router.get('/users/:id/starSoups', starSoups);
}
