require('dotenv').config();

import Koa from 'koa';
import session from 'koa-session';
import koaBody from 'koa-body';
import jwt from 'koa-jwt';
import cors from '@koa/cors';
import logger from 'koa-logger';
import Router from '@koa/router';
import { databaseConnect } from './common/database';
import appRouters from './routes/Index';

const app = new Koa();
const router: Router = new Router({
  prefix: '/api/v1'
});

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

// user cors
app.use(cors());

//jwt
app.use(
  jwt({ secret: process.env.APP_KEY }).unless({ path: [/^\/api\/v1\/public/] })
);

// register application routers
appRouters(router);

app.use(router.routes());
app.use(router.allowedMethods());

// console.log(process.env.NODE_ENV);

// startup application server
if (process.env.NODE_ENV !== 'test') {
  databaseConnect()
    .then(() => {
      app.listen(process.env.APP_PORT);
      console.log('Application is running');
    })
    .catch(error => console.log(error));
}

export default app;
