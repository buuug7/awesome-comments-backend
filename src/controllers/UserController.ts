import Koa from 'koa';
import { User } from '../entity/User';

/**
 * get the soups of user stared
 * GET /users/:id/starSoups
 * @param ctx
 * @param next
 */
export async function starSoups(ctx: Koa.Context, next) {
  const user = await User.findOne(ctx.params.id);
  ctx.body = await user.starSoups(ctx.request.query);
}

/**
 * get the comments of user stared
 * GET /users/:id/starComments
 * @param ctx
 */
export async function starComments(ctx) {
  const user = await User.findOneOrFail(ctx.params.id);
  ctx.body = await user.starComments(ctx.request.query);
}

export async function test(ctx: Koa.Context, next) {}
