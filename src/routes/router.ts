import auth from './auth';
import awesomeComments from './awesome-comments';

export default router => {
  auth(router);
  awesomeComments(router);
};
