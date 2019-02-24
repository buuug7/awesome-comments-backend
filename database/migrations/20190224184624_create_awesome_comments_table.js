exports.up = function (knex, Promise) {
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

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('awesome_comments')
}
