'use strict';
module.exports = (sequelize, DataTypes) => {
  const assessments = sequelize.define('assessments', {
    url: DataTypes.STRING,
    name: DataTypes.STRING,
    assigned_date: DataTypes.DATE,
    level: DataTypes.ENUM('Quiz', 'Practice', 'Exam'),
    max_score: DataTypes.INTEGER
  }, {});
  assessments.associate = function(models) {
    assessments.hasOne(models.submissions,
    {
      as: 'submissions',
      foreignKey: 'submittable_id',
      scope: {
        submittable: 'assessment'
      }
    });

    assessments.hasMany(models.grades, {
        as: "grades",
        foreignKey: 'assessment_id'
    });

  };
  return assessments;
};