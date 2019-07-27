import Koa from 'koa';
import { User } from '../entity/User';

export async function starSoups(ctx: Koa.Context, next) {
  const userId = ctx.params.id;

  const user = await User.findOne(userId);

  ctx.body = await user.starSoups();
}
