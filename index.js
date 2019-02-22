require('dotenv').config();

const Koa = require('koa');
const App = new Koa();
const session = require('koa-session');
const koaBody = require('koa-body');
const jwt = require('koa-jwt');
const cors = require('@koa/cors');
const logger = require('koa-logger');

const Router = require('koa-router');
const router = new Router();

App.keys = [process.env.APP_KEY];

// logger
App.use(logger());

// error handling
App.use(async(ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.body;
    ctx.app.emit('error', err, ctx);
  }
});

// session middleware
App.use(session(App));

// body parse
App.use(koaBody());

App.use(cors());

// jwt
// App.use(jwt({ secret: process.env.APP_KEY })
//   .unless({ path: [/^\/public/] }));

// router
require('./routes/router')(router);
App.use(router.routes());
App.use(router.allowedMethods());

App.listen(process.env.APP_PORT);
