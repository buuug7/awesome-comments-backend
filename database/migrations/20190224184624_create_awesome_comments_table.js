exports.up = function (knex, Promise) {

  return createAwesomeComments().then(createAwesomeCommentUserStars)

  function createAwesomeComments () {
    return knex.schema.createTable('awesome_comments', function (table) {
      table.increments('id').primary()
      table.integer('user_id').notNullable()
      table.text('content').notNullable()
      table.string('reference')
      table.boolean('active').defaultTo(false)
      table.dateTime('deleted_at')
      table.timestamps()
    })
  }

  function createAwesomeCommentUserStars () {
    return knex.schema.createTable('awesome_comment_user_stars',
      function (table) {
        table.integer('awesome_comment_id')
        table.integer('user_id')
        table.primary(['awesome_comment_id', 'user_id'])
        table.timestamps()
      })
  }
}

exports.down = function (knex, Promise) {
  return dropAwesomeComments().then(dropAwesomeCommentUserStars)

  function dropAwesomeComments () {
    return knex.schema.dropTableIfExists('awesome_comments')
  }

  function dropAwesomeCommentUserStars () {
    return knex.schema.dropTableIfExists('awesome_comment_user_stars')
  }
}
