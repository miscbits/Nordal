'use strict';
module.exports = (sequelize, DataTypes) => {
  const grades = sequelize.define('grades', {
    student_id: DataTypes.INTEGER,
    assessment_id: DataTypes.INTEGER,
    grade: DataTypes.INTEGER
  }, {});
  grades.associate = function(models) {
  	grades.belongsTo(models.assessments, {
      foreignKey: 'assessment_id',
      as: 'assessment'
    });

  	grades.belongsTo(models.students, {
      foreignKey: 'student_id',
      as: 'student'
    });
  };
  return grades;
};