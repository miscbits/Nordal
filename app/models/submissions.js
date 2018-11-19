'use strict';
module.exports = (sequelize, DataTypes) => {
  const submissions = sequelize.define('submissions', {
    pr_url: DataTypes.STRING,
    submission_url: DataTypes.STRING,
    submittable: DataTypes.STRING,
    latest_hash: DataTypes.STRING,
    student_id: DataTypes.INTEGER,
    submittable_id: DataTypes.INTEGER
  }, {});
  submissions.associate = function(models) {
    submissions.belongsTo(models.labs, {
      foreignKey: 'submittable_id',
      constraints: false,
      as: 'lab'
    });

    submissions.belongsTo(models.assessments, {
      foreignKey: 'submittable_id',
      constraints: false,
      as: 'assessment'
    });

    submissions.belongsTo(models.students, {
      foreignKey: 'student_id',
      constraints: false,
      as: "students"
    });
};

  return submissions;
};