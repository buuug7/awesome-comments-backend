"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const koa_1 = __importDefault(require("koa"));
const app = new koa_1.default();
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
    }
    catch (err) {
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
