'use strict';
module.exports = (sequelize, DataTypes) => {
  const Labs = sequelize.define('Labs', {
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {});
  Labs.associate = function(models) {
    // associations can be defined here
  };
  return Labs;
};