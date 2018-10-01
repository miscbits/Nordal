'use strict';
module.exports = (sequelize, DataTypes) => {
  const assessments = sequelize.define('assessments', {
    url: DataTypes.STRING,
    level: DataTypes.INTEGER,
    max_score: DataTypes.INTEGER
  }, {});
  assessments.associate = function(models) {
    // associations can be defined here
  };
  return assessments;
};