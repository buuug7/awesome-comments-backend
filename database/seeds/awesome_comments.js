const faker = require('faker')

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('awesome_comments').del().then(function () {
    // Inserts seed entries
    return knex('awesome_comments').insert([
      {
        id: 1,
        user_id: 1,
        content: faker.lorem.paragraph(),
        reference: faker.internet.url(),
        created_at: faker.date.recent(),
      },
      {
        id: 2,
        user_id: 1,
        content: faker.lorem.paragraph(),
        reference: faker.internet.url(),
        created_at: faker.date.recent(),
      },
      {
        id: 3,
        user_id: 2,
        content: faker.lorem.paragraph(),
        reference: faker.internet.url(),
        created_at: faker.date.recent(),
      },
    ])
  })
}
