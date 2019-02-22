module.exports = (router) => {
  router.get('/awesome-comments', (ctx, next) => {
    ctx.body = [1, 2, 3, 4];
  });
};