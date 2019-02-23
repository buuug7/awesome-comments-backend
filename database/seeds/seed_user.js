const faker = require('faker');


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: faker.name.findName(), email: faker.internet.email(), password: faker.internet.password()},
        {id: 2, name: faker.name.findName(), email: faker.internet.email(), password: faker.internet.password()},
      ]);
    });
};
