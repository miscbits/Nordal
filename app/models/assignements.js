'use strict';
module.exports = (sequelize, DataTypes) => {
  const assignements = sequelize.define('assignements', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    student_id: {
    	type: DataTypes.INTEGER
    },
    lab_id: {
    	type: DataTypes.INTEGER
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {});
  assignements.associate = function(models) {
    // associations can be defined here
  };
  return assignements;
};