const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('posts', {
    post_id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    post_message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Post;
};
