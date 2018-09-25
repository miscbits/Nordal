'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    google: DataTypes.STRING,
    github: DataTypes.STRING
  }, {});
  
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};