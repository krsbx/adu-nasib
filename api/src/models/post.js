const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.Users, {
        foreignKey: 'userId',
      });
    }
  }
  Post.init(
    {
      message: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Posts',
      paranoid: true,
    }
  );
  return Post;
};
