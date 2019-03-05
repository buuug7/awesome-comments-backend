const simplePaginate = require('../pagination');
const { AwesomeCommentUserStar } = require('./index');

module.exports = (sequelize, DataTypes) => {
  const AwesomeComment = sequelize.define(
    'AwesomeComment',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      UserId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      reference: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,

      // virtual fields
      author: {
        type: DataTypes.VIRTUAL,
        get: function() {
          return 'buuug7';
        }
      }
    },
    {
      paranoid: true,
      hooks: {
        /**
         * Add more columns to output at afterFind hooks
         * @param models
         * @param {{ctx:object,...}} options
         */
        afterFind: async function(models, options) {
          let userId = null;

          if (!options.ctx) {
            return;
          }

          if (options.ctx.state.user) {
            userId = options.ctx.state.user.id;
          }

          if (!models.length) {
            models = [models];
          }

          let asyncOperations = [];

          models.forEach(async function(model) {
            // sync
            // attach `hasOwnedByRequestUser` to the result
            model.setDataValue(
              'hasOwnedByRequestUser',
              model.hasOwnedByGivenUser(userId)
            );

            // below is async operation
            // put async operation to asyncOperation array

            // set hasStarByRequestUser
            let hasStarByRequestUserCallback = model
              .hasStarUser(userId)
              .then(res => model.setDataValue('hasStarByRequestUser', res));
            asyncOperations.push(hasStarByRequestUserCallback);
          });

          return Promise.all(asyncOperations);
        }
      }
    }
  );
  AwesomeComment.associate = function(models) {
    models.AwesomeComment.belongsTo(models.User);
    models.AwesomeComment.belongsToMany(models.User, {
      as: { singular: 'StarUser', plural: 'StarUsers' },
      through: models.AwesomeCommentUserStar
    });
  };

  AwesomeComment.simplePaginate = simplePaginate;

  /**
   * Detect the resource is owned by a given user
   * @param {number} userId
   * @return {Promise<boolean>}
   */
  AwesomeComment.prototype.hasOwnedByGivenUser = function(userId) {
    return userId && this.UserId === userId;
  };

  /**
   * Detect the resource is stared by a given user
   * @param {number} userId
   * @return {Promise<boolean>}
   */
  AwesomeComment.prototype.hasStarByGivenUser = async function(userId) {
    return await this.hasStarUser(userId);
  };

  return AwesomeComment;
};
