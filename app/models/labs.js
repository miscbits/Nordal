'use strict';
module.exports = (sequelize, DataTypes) => {
  const Labs = sequelize.define('Labs', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    url: {
      type: DataTypes.STRING,
      unique: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
    },
    updated_at: DataTypes.DATE
  }, {});
  Labs.associate = function(models) {
    // associations can be defined here
  };
  return Labs;
};