'use strict';
module.exports = (sequelize, DataTypes) => {
  const assessments = sequelize.define('assessments', {
    url: DataTypes.STRING,
    level: DataTypes.ENUM('Quiz', 'Practice'),
    max_score: DataTypes.INTEGER
  }, {});
  assessments.associate = function(models) {
    assessments.hasOne(models.submissions,
    {
      as: 'submission',
      foreignKey: 'submittable_id',
      scope: {
        submittable: 'assessment'
      }
    });
  };
  return assessments;
};