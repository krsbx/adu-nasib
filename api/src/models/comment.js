const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.Posts, {
        foreignKey: 'postId',
      });
      Comment.belongsTo(models.Users, {
        foreignKey: 'userId',
      });
    }
  }
  Comment.init(
    {
      message: DataTypes.STRING,
      postId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Comments',
      paranoid: true,
    }
  );
  return Comment;
};
