'use strict';
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define('comments', {
    student_id: DataTypes.INTEGER,
    body: DataTypes.STRING,
    note_taker: DataTypes.STRING
  }, {});
  comments.associate = function(models) {
    comments.belongsTo(models.students,
    {
      as: 'student',
      foreignKey: 'student_id'
    });
  };
  return comments;
};