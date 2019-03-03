'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AwesomeCommentUserStars', {
      AwesomeCommentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('AwesomeCommentUserStars')
  }
}
