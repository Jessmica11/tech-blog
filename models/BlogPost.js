// create blog post model
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  // associates the model BlogPost with User and Comment
  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    BlogPost.hasMany(models.Comment, {
      onDelete: 'CASCADE',
    });
  };

  return BlogPost;
};
