const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'AwesomeComments',
      [
        {
          userId: 1,
          content: faker.lorem.paragraph(),
          reference: faker.internet.url(),
          createdAt: faker.date.recent(),
          updatedAt: faker.date.recent()
        },
        {
          userId: 1,
          content: faker.lorem.paragraph(),
          reference: faker.internet.url(),
          createdAt: faker.date.recent(),
          updatedAt: faker.date.recent()
        },
        {
          userId: 1,
          content: faker.lorem.paragraph(),
          reference: faker.internet.url(),
          createdAt: faker.date.recent(),
          updatedAt: faker.date.recent()
        },
        {
          userId: 1,
          content: faker.lorem.paragraph(),
          reference: faker.internet.url(),
          createdAt: faker.date.recent(),
          updatedAt: faker.date.recent()
        },
        {
          userId: 1,
          content: faker.lorem.paragraph(),
          reference: faker.internet.url(),
          createdAt: faker.date.recent(),
          updatedAt: faker.date.recent()
        },
        {
          userId: 1,
          content: faker.lorem.paragraph(),
          reference: faker.internet.url(),
          createdAt: faker.date.recent(),
          updatedAt: faker.date.recent()
        },
        {
          userId: 1,
          content: faker.lorem.paragraph(),
          reference: faker.internet.url(),
          createdAt: faker.date.recent(),
          updatedAt: faker.date.recent()
        },
        {
          userId: 1,
          content: faker.lorem.paragraph(),
          reference: faker.internet.url(),
          createdAt: faker.date.recent(),
          updatedAt: faker.date.recent()
        },
        {
          userId: 2,
          content: faker.lorem.paragraph(),
          reference: faker.internet.url(),
          createdAt: faker.date.recent(),
          updatedAt: faker.date.recent()
        },
        {
          userId: 2,
          content: faker.lorem.paragraph(),
          reference: faker.internet.url(),
          createdAt: faker.date.recent(),
          updatedAt: faker.date.recent()
        },
        {
          userId: 2,
          content: faker.lorem.paragraph(),
          reference: faker.internet.url(),
          createdAt: faker.date.recent(),
          updatedAt: faker.date.recent()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AwesomeComments', null, {});
  }
};
