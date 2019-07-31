import auth from './auth';
import soups from './soup';
import user from './user';
import comment from './comment';

export default router => {
  auth(router);
  soups(router);
  user(router);
  comment(router);
};
