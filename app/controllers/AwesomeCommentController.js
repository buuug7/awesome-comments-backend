const dayjs = require('dayjs')
const { AwesomeComment, User } = require('../models/index.js')

/**
 * Get a listing of the resource
 * GET /awesome-comments
 * @return {array}
 */
async function list (ctx, next) {

  /** @type {{page:number}} */
  const q = ctx.request.query

  console.log(q)

  ctx.body = await AwesomeComment.simplePaginate({
    baseUrl: ctx.request.path,
    currentPage: q.page || 1,
  })
}

/**
 * Get the specified resource
 * GET /awesome-comments/:id
 * @return {AwesomeComment}
 */
async function show (ctx, next) {
  const userId = ctx.state.user ? ctx.state.user.user.id : null

  const instance = await AwesomeComment.findOne({
    where: { id: ctx.params.id },
  })

  ctx.body = {
    data: {
      ...instance.toJSON(),
    },
  }
}

/**
 * Store a newly created resource in storage
 * POST /awesome-comments
 * @return {AwesomeComment}
 */
async function create (ctx, next) {

  const requestBody = ctx.request.body

  const instance = await AwesomeComment.create({
    userId: requestBody.userId,
    content: requestBody.content,
    reference: requestBody.reference,
  })

  ctx.body = {
    data: instance,
  }
}

/**
 * Update the specified resource in storage
 * PUT /awesome-comments/:id
 * @return {object}
 */
async function update (ctx, next) {
  const requestBody = ctx.request.body
  const id = ctx.params.id

  const instance = await AwesomeComment.update(requestBody, {
    where: { id: id },
  })

  ctx.body = {
    data: instance,
  }
}

/**
 * Remove the specified resource from storage
 * DELETE /awesome-comments/:id
 * @return {object}
 */
async function destroy (ctx, next) {
  const id = ctx.params.id
  const rs = await AwesomeComment.destroy({
    where: { id: id },
  })

  ctx.body = {
    data: rs,
  }
}

/**
 * Star the specified resource
 * return the start count number
 * POST /awesome-comments/:id/star
 * @return {object}
 */
async function star (ctx, next) {

  const userId = ctx.state.user.user.id

  const instance = await AwesomeComment.findOne({
    where: { id: ctx.params.id },
  })

  const rs = await instance.addStarUser(userId)

  if (!rs) {
    ctx.status = 403
    return ctx.body = {
      message: 'oops, there is something wrong while star, perhaps it was already stared',
    }
  }

  ctx.body = {
    data: { count: await instance.countStarUsers() },
  }

}

/**
 * unStar the specified resource
 * return the star count number
 * @return {object}
 */
async function unStar (ctx, next) {
  const userId = ctx.state.user.user.id
  const instance = await AwesomeComment.findOne({
    where: { id: ctx.params.id },
  })

  const rs = await instance.removeStarUser(userId)

  if (!rs) {
    ctx.status = 403
    ctx.body = {
      message: 'oops, there is something wrong while unstar, perhaps it was already unstared.',
    }
  }

  ctx.body = {
    data: await instance.countStarUsers(),
  }
}

/**
 * Get the star count of specified resource
 * @return {object}
 */
async function starCount (ctx, next) {

  const instance = await AwesomeComment.findOne({
    where: { id: ctx.params.id },
  })

  ctx.body = {
    data: {
      count: await instance.countStarUsers(),
    },
  }
}

module.exports = {
  list,
  show,
  create,
  update,
  destroy,
  star,
  unStar,
  starCount,
}