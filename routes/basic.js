const jsonWebToken = require('jsonwebtoken');
const DB = require('../app/db');

module.exports = (router) => {
  router.get('/public/login', (ctx, next) => {
    const user = {
      name: 'buuug7',
      password: 'secret'
    };

    ctx.body = {
      token: jsonWebToken.sign(user, process.env.APP_KEY)
    };
  });

  // getting the home route
  router.get('/public/test', async(ctx, next) => {

    let s = await DB.select().from('users');

    ctx.body = s;

  });

};