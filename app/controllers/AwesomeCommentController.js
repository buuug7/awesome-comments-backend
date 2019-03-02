const dayjs = require('dayjs')
const { AwesomeComment } = require('../models/index.js')

/**
 * Display a listing of the resource
 * GET /awesome-comments
 * @return array
 */
async function list (ctx, next) {

  /** @type {{page:number}} */
  const q = ctx.request.query

  console.log(q)

  ctx.body = await AwesomeComment.simplePaginate({
    baseUrl: ctx.request.path,
    currentPage: q.page || 1
  })
}

/**
 * Display the specified resource
 * GET /awesome-comments/:id
 * @return {AwesomeComment}
 */
async function show (ctx, next) {
  const instance = await AwesomeComment.findOne({
    where: { id: ctx.params.id }
  })

  ctx.body = {
    data: instance,
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
    // createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
  })

  ctx.body = {
    data: instance.toJSON(),
  }
}

/**
 * Update the specified resource in storage
 * PUT /awesome-comments/:id
 * @return {object}
 */
async function update (ctx, next) {
  // const requestBody = ctx.request.body
  // const id = ctx.params.id
  //
  // const instance = await AwesomeComment.where({ id: id }).
  //   save(requestBody, { patch: true })
  //
  // ctx.body = {
  //   data: instance.toJSON(),
  // }
}

/**
 * Remove the specified resource from storage
 * DELETE /awesome-comments/:id
 * @return array
 */
async function destroy (ctx, next) {
  // const id = ctx.params.id
  // const rs = await AwesomeComment.where({ id: id }).destroy()
  //
  // ctx.body = {
  //   data: rs,
  // }
}

/**
 * Star the specified resource
 * return the start count number
 * POST /awesome-comments/:id/star
 * @return {object}
 */
async function star (ctx, next) {

  // const userId = ctx.state.user.user.id
  // const instance = new AwesomeComment({ id: ctx.params.id })
  // const isStared = await instance.hasStarByGivenUser(userId)
  //
  // if (isStared) {
  //   ctx.status = 403
  //   return ctx.body = {
  //     message: 'oops, the resource already star',
  //   }
  // }
  //
  // await instance.starUsers().attach(userId)
  //
  // let count = await instance.starUsersCount()
  //
  // ctx.body = {
  //   data: { count: count },
  // }
}

/**
 * Unstar the specified resource
 * return the star count number
 * @return {object}
 */
async function unstar (ctx, next) {
  // const userId = ctx.state.user.user.id
  // const instance = new AwesomeComment({ id: ctx.params.id })
  // await instance.starUsers().detach(userId)
  // let count = await instance.starUsersCount()
  //
  // ctx.body = {
  //   data: { count: count },
  // }
}

async function starCount () {

}

async function is () {

}

module.exports = { list, show, create, update, destroy, star, unstar }