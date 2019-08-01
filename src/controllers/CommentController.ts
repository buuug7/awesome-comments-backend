import { Comment } from '../entity/Comment';
import HttpStatus from 'http-status-codes';

/**
 * get specified resource
 * GET /comments/:id
 * @param ctx
 */
export async function show(ctx) {
  ctx.body = await Comment.findOneOrFail(ctx.params.id, {
    relations: ['targetComment', 'user']
  });
}

/**
 * reply specified resource
 * POST /comments/:id/reply
 * @param ctx
 */
export async function reply(ctx) {
  const content = ctx.request.body.content;
  const user = ctx.state.user;
  const comment = await Comment.findOneOrFail(ctx.params.id);
  ctx.body = await comment.reply({ content, user });
}

/**
 * star the specified resource
 * POST /comments/:id/star
 * @param ctx
 */
export async function star(ctx) {
  const comment = await Comment.findOneOrFail(ctx.params.id);
  const user = ctx.state.user;
  const isStar = await comment.isStarByGivenUser(user);

  if (isStar) {
    ctx.throw('the resource is already star by current user');
  }

  await comment.star(user);
  ctx.status = HttpStatus.OK;
  ctx.body = {
    count: await comment.starCount()
  };
}

/**
 * unStar the specified resource
 * @param ctx
 */
export async function unStar(ctx) {
  const comment = await Comment.findOneOrFail(ctx.params.id);
  await comment.unStar(ctx.state.user);
  ctx.body = {
    count: await comment.starCount()
  };
}

/**
 * get the star count of specified resource
 * GET /comments/:id/starCount
 * @param ctx
 */
export async function starCount(ctx) {
  const comment = await Comment.findOneOrFail(ctx.params.id);
  ctx.body = {
    count: await comment.starCount()
  };
}

/**
 * GET /comments/:id/starUsers
 * @param ctx
 */
export async function starUsers(ctx) {
  const comment = await Comment.findOneOrFail(ctx.params.id);
  ctx.body = await comment.starUsers(ctx.request.query);
}
