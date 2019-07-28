import Koa from 'koa';
import { User } from '../entity/User';
import { createQueryBuilder } from 'typeorm';
import { simplePagination } from '../common/pagination';
import { Soup } from '../entity/Soup';

export async function starSoups(ctx: Koa.Context, next) {
  const userId = ctx.params.id;

  const user = await User.findOne(userId);

  ctx.body = await user.starSoups();
}


export async function test(ctx: Koa.Context, next) {


}
