const jsonWebToken = require('jsonwebtoken');

module.exports = (router) => {
  // getting the home route
  router.get('/', (ctx, next) => {
    // ctx.session.a =1;
    console.log(ctx.session.a);

    ctx.type = 'application/json';

    ctx.body = {
      status: 'success',
      data: ctx.state
    };
  });

  router.get('/public/login', (ctx, next) => {
    const user = {
      name: 'buuug7',
      password: 'secret'
    };

    ctx.body = {
      token: jsonWebToken.sign(user, process.env.APP_KEY)
    };
  });

};