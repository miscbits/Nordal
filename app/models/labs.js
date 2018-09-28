'use strict';

module.exports = (sequelize, DataTypes) => {
  const Labs = sequelize.define('labs', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    url: {
      type: DataTypes.STRING,
      unique: true
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
  Labs.associate = function(models) {
    // associations can be defined here
  };
  return Labs;
};