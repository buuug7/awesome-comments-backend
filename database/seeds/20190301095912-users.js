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
        updatedAt: faker.date.recent()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
     Add reverting commands here.
     Return a promise to correctly handle asynchronicity.

     Example:
     return queryInterface.bulkDelete('People', null, {});
     */
  }
}
