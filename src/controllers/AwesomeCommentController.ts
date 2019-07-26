import { getRepository, Repository, Like } from 'typeorm';
import { AwesomeComment } from '../entity/AwesomeComment';
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

  const awesomeCommentsRepository: Repository<AwesomeComment> = getRepository(
    AwesomeComment
  );

  const [data, total] = await awesomeCommentsRepository.findAndCount({
    take: pageSize,
    skip: (page - 1) * pageSize,
    where: {
      // content: Like(`%${where.content}%`)
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
 * @return {AwesomeComment}
 */
export async function show(ctx: Koa.Context, next) {
  const repository = getRepository(AwesomeComment);

  ctx.body = await repository.findOne(ctx.params.id);
}

/**
 * Store a newly created resource in storage
 * POST /awesome-comments
 * @return {AwesomeComment}
 */
export async function create(ctx, next) {
  const requestBody: AwesomeComment = ctx.request.body;
  const awesomeCommentRepository = getRepository(AwesomeComment);
  const awesomeComment: AwesomeComment = awesomeCommentRepository.create(
    requestBody
  );
  awesomeComment.createdAt = new Date();
  awesomeComment.user = await getRepository(User).findOne(ctx.state.user.id);

  ctx.body = await awesomeCommentRepository.save(awesomeComment);
}

/**
 * Update the specified resource in storage
 * PUT /awesome-comments/:id
 * @return {object}
 */
export async function update(ctx, next) {
  const requestBody = ctx.request.body;
  const id = ctx.params.id;

  const awesomeCommentRepository = getRepository(AwesomeComment);
  const awesomeComment = await awesomeCommentRepository.findOne(id);

  if (!awesomeComment) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  const updatedAwesomeComment = await awesomeCommentRepository.merge(
    awesomeComment,
    requestBody
  );

  await awesomeCommentRepository.save(updatedAwesomeComment);

  ctx.body = updatedAwesomeComment;
}

/**
 * Remove the specified resource from storage
 * DELETE /awesome-comments/:id
 * @param ctx
 * @param next
 */
export async function destroy(ctx, next) {
  const id = ctx.params.id;
  const repository = getRepository(AwesomeComment);
  const awesomeComment = await repository.findOne(id);

  if (!awesomeComment) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  await repository.delete(id);
  ctx.status = HttpStatus.OK;
}

/**
 * Star the specified resource
 * return the start count number
 * POST /awesome-comments/:id/star
 * @return {object}
 */
// async function star(ctx, next) {
//   const userId = ctx.state.user.id;
//
//   const instance = await AwesomeComment.findOne({
//     where: { id: ctx.params.id }
//   });
//
//   const rs = await instance.addStarUser(userId);
//
//   if (!rs) {
//     ctx.status = 403;
//     return (ctx.body = {
//       message:
//         'oops, there is something wrong while star, perhaps it was already stared'
//     });
//   }
//
//   ctx.body = {
//     data: { count: await instance.countStarUsers() }
//   };
// }

/**
 * unStar the specified resource
 * return the star count number
 * @return {object}
 */
// async function unStar(ctx, next) {
//   const userId = ctx.state.user.id;
//   const instance = await AwesomeComment.findOne({
//     where: { id: ctx.params.id }
//   });
//
//   const rs = await instance.removeStarUser(userId);
//
//   if (!rs) {
//     ctx.status = 403;
//     ctx.body = {
//       message:
//         'oops, there is something wrong while unstar, perhaps it was already unstared.'
//     };
//   }
//
//   ctx.body = {
//     data: await instance.countStarUsers()
//   };
// }

/**
 * Get the star count of specified resource
 * @return {object}
 */
// async function starCount(ctx, next) {
//   const instance = await AwesomeComment.findOne({
//     where: { id: ctx.params.id }
//   });
//
//   ctx.body = {
//     data: {
//       count: await instance.countStarUsers()
//     }
//   };
// }
//
