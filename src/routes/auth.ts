import { auth, github, githubCallback } from '../controllers/AuthController';

export default router => {
  router.post('/public/auth', auth);
  router.get('/public/login/github', github);
  router.get('/public/login/github/callback', githubCallback);
}
