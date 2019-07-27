import auth from './auth';
import soups from './soups';

export default router => {
  auth(router);
  soups(router);
};
