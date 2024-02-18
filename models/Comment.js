// create the model for Comment
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Comment = sequelize.define('Comment', {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  // associates the model Comment with User and BlogPost
  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    Comment.belongsTo(models.BlogPost, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Comment;
};
