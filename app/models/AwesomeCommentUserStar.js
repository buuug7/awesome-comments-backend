"use strict";
module.exports = (sequelize, DataTypes) => {
    const AwesomeCommentUserStar = sequelize.define('AwesomeCommentUserStar', {
        AwesomeCommentId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        UserId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    });
    AwesomeCommentUserStar.associate = function (models) { };
    return AwesomeCommentUserStar;
};
