import authRouter from './AuthRouter';
import soupRouter from './SoupRouter';
import userRouter from './UserRouter';
import commentRouter from './CommentRouter';

export default router => {
  authRouter(router);
  soupRouter(router);
  userRouter(router);
  commentRouter(router);
};
