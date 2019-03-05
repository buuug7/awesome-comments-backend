'use strict'

const faker = require('faker')
const bcrypt = require('bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [
      {
        name: 'master',
        email: 'master@dev.com',
        password: bcrypt.hashSync('master', 3),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
      },
      {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
      },
      {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
      },
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  },
}
