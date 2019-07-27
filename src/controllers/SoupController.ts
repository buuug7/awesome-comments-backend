import { getRepository, Repository, Like } from 'typeorm';
import { Soup } from '../entity/Soup';
import Koa from 'koa';
import { User } from '../entity/User';
import HttpStatus from 'http-status-codes';

interface QueryParam {
  page?: number;
  pageSize?: number;
  search?: {
    content?: string;
  };
}

/**
 *
 * @param ctx
 * @param next
 */
export async function list(ctx, next) {
  const query: QueryParam = ctx.request.query;
  const { page = 1, pageSize = 3 } = query;

  // @ts-ignore
  console.log(query.search.content);
  console.log(query);

  const [data, total] = await Soup.findAndCount({
    take: pageSize,
    skip: (page -1) * pageSize,
    where: {
      // content: Like('%Ducimus%')
    }
  });



  ctx.body = {
    total,
    data
  };
}

/**
 * Get the specified resource
 * GET /awesome-comments/:id
 * @return {Soup}
 */
export async function show(ctx: Koa.Context, next) {
  ctx.body = await Soup.findOne(ctx.params.id);
}

/**
 * Store a newly created resource in storage
 * POST /awesome-comments
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
 * PUT /awesome-comments/:id
 * @return {object}
 */
export async function update(ctx, next) {
  const soup = await Soup.findOne(ctx.params.id);

  if (!soup) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  const updatedSoup = await Soup.merge(soup, ctx.request.body);
  await updatedSoup.save();

  ctx.body = updatedSoup;
}

/**
 * Remove the specified resource from storage
 * DELETE /awesome-comments/:id
 * @param ctx
 * @param next
 */
export async function destroy(ctx, next) {
  const soup = await Soup.findOne(ctx.params.id);

  if (!soup) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  await soup.remove();
  ctx.status = HttpStatus.OK;
}

/**
 * Star the specified resource
 * return the start count number
 * POST /awesome-comments/:id/star
 * @return {object}
 */
export async function star(ctx, next) {
  const user: User = await User.findOne(ctx.state.user.id);
  const soup: Soup = await Soup.findOne(ctx.params.id);

  if (!soup) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

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
  const user = await User.findOne(ctx.state.user.id);
  const soup = await Soup.findOne(ctx.params.id);

  if (!soup) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  await soup.unStar(user);
  ctx.body = {
    count: await soup.starCount()
  };
}

/**
 * Get the star count of specified resource
 * @return {object}
 */
export async function starCount(ctx, next) {
  const soup = await Soup.findOne(ctx.params.id);

  if (!soup) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  ctx.body = {
    count: await soup.starCount()
  };
}
