'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('students', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    cell_number: DataTypes.INTEGER,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    github_id: DataTypes.INTEGER,
    github_username: DataTypes.STRING
  }, {});
  
  Student.associate = function(models) {
    // associations can be defined here
  };

  return Student;
};