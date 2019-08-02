import { createQueryBuilder } from 'typeorm';
import { Soup } from '../entity/Soup';
import Koa from 'koa';
import { User } from '../entity/User';
import HttpStatus from 'http-status-codes';
import { PaginationParam, simplePagination } from '../common/pagination';
import { Comment } from '../entity/Comment';

/**
 *
 * @param ctx
 * @param next
 */
export async function list(ctx, next) {
  let param: PaginationParam = ctx.request.query;

  console.log(param);

  const query = createQueryBuilder(Soup).select();

  if (param.search_content) {
    query.andWhere('content Like :content', {
      content: `%${param.search_content}%`
    });
  }

  if (param.search_createdAtFrom && !param.search_createdAtTo) {
    query.andWhere('createdAt >= :createdAt', {
      createdAt: param.search_createdAtFrom
    });
  }

  if (param.search_createdAtTo && !param.search_createdAtFrom) {
    query.andWhere('createdAt <= :createdAt', {
      createdAt: param.search_createdAtTo
    });
  }

  if (param.search_createdAtFrom && param.search_createdAtTo) {
    query.andWhere('createdAt BETWEEN :createdAtFrom AND :createdAtTo', {
      createdAtFrom: param.search_createdAtFrom,
      createdAtTo: param.search_createdAtTo
    });
  }

  if (param.search_user) {
    const user = await User.findOne({ name: param.search_user });

    query.andWhere('userId = :userId', {
      userId: user.id
    });
  }

  ctx.body = await simplePagination(query, param);
}

/**
 * Get the specified resource
 * @return {Soup}
 */
export async function show(ctx: Koa.Context, next) {
  ctx.body = await Soup.findOneOrFail(ctx.params.id);
}

/**
 * Store a newly created resource in storage
 * @return {Soup}
 */
export async function create(ctx, next) {
  const soup = Soup.create(ctx.request.body);
  soup.createdAt = new Date();
  soup.user = await User.findOne(ctx.state.user.id);

  ctx.body = await Soup.save(soup);
}

/**
 * Update the specified resource in storage
 * @return {object}
 */
export async function update(ctx, next) {
  const soup = await Soup.findOneOrFail(ctx.params.id);
  const updatedSoup = await Soup.merge(soup, ctx.request.body);
  await updatedSoup.save();

  ctx.body = updatedSoup;
}

/**
 * Remove the specified resource from storage
 * @param ctx
 * @param next
 */
export async function destroy(ctx, next) {
  const soup = await Soup.findOneOrFail(ctx.params.id);

  await soup.remove();
  ctx.status = HttpStatus.OK;
}

/**
 * Star the specified resource
 * return the start count number
 * @return {object}
 */
export async function star(ctx, next) {
  const user = ctx.state.user;
  const soup: Soup = await Soup.findOneOrFail(ctx.params.id);

  const isStar = await soup.isStarByGivenUser(user);

  if (isStar) {
    ctx.throw('the resource is already star by current user');
  }

  await soup.star(user);
  ctx.status = HttpStatus.OK;
  ctx.body = {
    count: await soup.starCount()
  };
}

/**
 * unStar the specified resource
 * return the star count number
 */
export async function unStar(ctx, next) {
  const soup = await Soup.findOneOrFail(ctx.params.id);

  await soup.unStar(ctx.state.user);
  ctx.body = {
    count: await soup.starCount()
  };
}

/**
 * Get the star count of specified resource
 * @return {object}
 */
export async function starCount(ctx, next) {
  const soup = await Soup.findOneOrFail(ctx.params.id);

  ctx.body = {
    count: await soup.starCount()
  };
}

/**
 * comment on the specified resource
 * POST /soups/:id/comment
 * @param ctx
 * @param next
 */
export async function createComment(ctx, next) {
  const soup = await Soup.findOneOrFail(ctx.params.id);
  const targetCommentId = ctx.request.body.targetCommentId;

  let targetComment = targetCommentId
    ? await Comment.findOneOrFail(targetCommentId)
    : null;

  ctx.body = await soup.createComment({
    content: ctx.request.body.content,
    user: ctx.state.user,
    targetComment: targetComment
  });
}

/**
 * get the specified resource comments
 * GET /soups/:id/comments
 * @param ctx
 * @param next
 */
export async function getComments(ctx, next) {
  const soup = await Soup.findOneOrFail(ctx.params.id);
  ctx.body = await soup.comments(ctx.request.query);
}
