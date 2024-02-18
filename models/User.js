// create a model for the User login info here
const { DataTypes } = require('sequelize');
// bcrypt for password hashing per README
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // hash the password before creating a new user
User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  // associates the models User with BlogPost and Comment
  User.associate = (models) => {
    User.hasMany(models.BlogPost, {
      onDelete: 'CASCADE',
    });
    User.hasMany(models.Comment, {
      onDelete: 'CASCADE',
    });
  };

  return User;
};
