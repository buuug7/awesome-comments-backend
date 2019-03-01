const faker = require('faker')
const bcrypt = require('bcrypt')

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del().then(function () {
    // Inserts seed entries
    return knex('users').insert([
      {
        id: 1,
        name: 'buuug7',
        email: 'youpp@126.com',
        password: bcrypt.hashSync('111111', 3),
        created_at: faker.date.recent()
      },
      {
        id: 2,
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
      {
        id: 3,
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    ])
  })
}
