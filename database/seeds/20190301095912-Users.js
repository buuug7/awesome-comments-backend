'use strict'

const faker = require('faker')
const bcrypt = require('bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [
      {
        name: 'buuug7',
        email: 'youpp@126.com',
        password: bcrypt.hashSync('111111', 3),
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
