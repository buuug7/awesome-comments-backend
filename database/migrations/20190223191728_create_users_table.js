exports.up = function (knex, Promise) {

  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('email').notNullable().unique()
    table.string('password').notNullable()
    table.string('remember_token')
    table.timestamps()
  })

}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('users')
}
