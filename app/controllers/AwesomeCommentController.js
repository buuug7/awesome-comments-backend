const AwesomeComment = require('../models/AwesomeComment')
const User = require('../models/User')
const dayjs = require('dayjs')
const { addPreAndNextPageUrlToPagination } = require('../pagination')

const { knex } = require('../db')

/**
 * Display a listing of the resource
 * GET /awesome-comments
 * @return array
 */
async function list (ctx, next) {
  const q = ctx.request.query

  const lists = await AwesomeComment.fetchPage({
    page: q.page || 1,
    pageSize: q.pageSize || 5
  })

  const pagination = addPreAndNextPageUrlToPagination(lists.pagination, ctx.request.path)

  ctx.body = {
    ...pagination,
    data: lists.toJSON()
  }
}

/**
 * Display the specified resource
 * GET /awesome-comments/:id
 * @return {AwesomeComment}
 */
async function show (ctx, next) {
  ctx.body = {
    data: await AwesomeComment.where({ id: ctx.params.id }).fetch()
  }
}

/**
 * Store a newly created resource in storage
 * POST /awesome-comments
 * @return {AwesomeComment}
 */
async function create (ctx, next) {

  const requestBody = ctx.request.body

  const instance = await new AwesomeComment({
    user_id: requestBody.user_id,
    content: requestBody.content,
    reference: requestBody.reference,
    created_at: requestBody.created_at
  }).save()

  ctx.body = {
    data: instance.toJSON()
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

  const instance = await AwesomeComment.where({ id: id }).save(requestBody, { patch: true })

  ctx.body = {
    data: instance.toJSON()
  }
}

/**
 * Remove the specified resource from storage
 * DELETE /awesome-comments/:id
 * @return array
 */
async function destroy (ctx, next) {
  const id = ctx.params.id

  const rs = await AwesomeComment.where({ id: id }).destroy()

  ctx.body = {
    data: rs
  }
}

/**
 * Star the specified resource
 * POST /awesome-comments/:id/star
 * @return array
 */
async function star (ctx, next) {

  const userId = ctx.state.user.user.id

  const instance = new AwesomeComment({ id: ctx.params.id })

  let isStared = await instance.hasStarByGivenUser(userId)

  if (isStared) {
    ctx.status = 403
    return ctx.body = {
      message: 'the resource already star'
    }
  }

  await instance.starUsers().attach(userId)

  let starCount = await knex('awesome_comment_user_stars').where({
    awesome_comment_id: ctx.params.id
  }).count('* as c')

  ctx.body = {
    data: {
      count: starCount[0].c
    }
  }
}

module.exports = { list, show, create, update, destroy, star }