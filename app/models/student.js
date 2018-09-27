'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('students', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    cell_number: DataTypes.INTEGER,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    github_id: DataTypes.INTEGER,
    github_username: DataTypes.STRING,
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {});
  
  Student.associate = function(models) {
    // associations can be defined here
  };

  return Student;
};