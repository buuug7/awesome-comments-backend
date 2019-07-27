import {
  getRepository,
  Repository,
  Like,
  Between,
  LessThan,
  MoreThan,
  createQueryBuilder
} from 'typeorm';
import { Soup } from '../entity/Soup';
import Koa from 'koa';
import { User } from '../entity/User';
import HttpStatus from 'http-status-codes';
import { PaginationParam, simplePagination } from '../pagination';

/**
 *
 * @param ctx
 * @param next
 */
export async function list(ctx, next) {
  let param: PaginationParam = ctx.request.query;

  console.log(param);

  const queryBuilder = createQueryBuilder(Soup).select();

  if (param.search_content) {
    queryBuilder.andWhere('content Like :content', {
      content: `%${param.search_content}%`
    });
  }

  if (param.search_createdAtFrom && !param.search_createdAtTo) {
    queryBuilder.andWhere('createdAt >= :createdAt', {
      createdAt: param.search_createdAtFrom
    });
  }

  if (param.search_createdAtTo && !param.search_createdAtFrom) {
    queryBuilder.andWhere('createdAt <= :createdAt', {
      createdAt: param.search_createdAtTo
    });
  }

  if (param.search_createdAtFrom && param.search_createdAtTo) {
    queryBuilder.andWhere('createdAt BETWEEN :createdAtFrom AND :createdAtTo', {
      createdAtFrom: param.search_createdAtFrom,
      createdAtTo: param.search_createdAtTo
    });
  }

  if (param.search_user) {
    const user = await User.findOne({ name: param.search_user });

    queryBuilder.andWhere('userId = :userId', {
      userId: user.id
    });
  }

  ctx.body = await simplePagination(queryBuilder, param);
}

/**
 * Get the specified resource
 * GET /awesome-comments/:id
 * @return {Soup}
 */
export async function show(ctx: Koa.Context, next) {
  ctx.body = await Soup.findOneOrFail(ctx.params.id);
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
  const soup = await Soup.findOneOrFail(ctx.params.id);
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
  const soup = await Soup.findOneOrFail(ctx.params.id);

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
  const user: User = await User.findOneOrFail(ctx.state.user.id);
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
  const user = await User.findOneOrFail(ctx.state.user.id);
  const soup = await Soup.findOneOrFail(ctx.params.id);

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
  const soup = await Soup.findOneOrFail(ctx.params.id);

  ctx.body = {
    count: await soup.starCount()
  };
}
