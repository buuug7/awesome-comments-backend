import auth from './auth';
import soups from './soups';
import user from './user';

export default router => {
  auth(router);
  soups(router);
  user(router);
};
