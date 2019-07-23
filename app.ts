require('dotenv').config();

import Koa from 'koa';

const app = new Koa();
const session = require('koa-session');
const koaBody = require('koa-body');
const jwt = require('koa-jwt');
const cors = require('@koa/cors');
const logger = require('koa-logger');

const Router = require('koa-router');
const router = new Router();

// @ts-ignore
app.keys = [process.env.APP_KEY];

// logger
app.use(logger());

// error handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message
    };
  }
});

// session middleware
app.use(session(app));

// body parse
app.use(koaBody());

app.use(cors());

//jwt
app.use(jwt({ secret: process.env.APP_KEY }).unless({ path: [/^\/public/] }));

// router
require('./routes/router')(router);
app.use(router.routes());
app.use(router.allowedMethods());

// console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.APP_PORT);
}

module.exports = app;
